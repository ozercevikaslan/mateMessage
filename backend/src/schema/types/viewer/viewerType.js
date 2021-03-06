import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from '../node/nodeDefinition';
import { idMapping } from '../../../helpers/mapping';
import conversationConnectionType from '../conversation/conversationConnectionType';
import { findConversations } from '../conversation/conversationMongoHelper';
import { createConnectionArguments } from '../../../db/helpers/pagination';
import userConnectionType from '../user/userConnectionType';
import { findUsers } from '../user/userMongoHelper';
import Message from '../../../db/models/Message';

const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  isTypeOf: obj => {
    if (obj.isViewer) {
      return obj;
    }
  },
  fields: () => ({
    id: globalIdField('Viewer', idMapping),
    userId: {
      type: GraphQLString,
      resolve: idMapping
    },
    name: {
      type: GraphQLString
    },
    username: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    avatar: {
      type: GraphQLString
    },
    messageCount: {
      type: GraphQLInt,
      resolve: async (_, args, context) => {
        if (!context.user) {
          return null;
        }

        return Message.find({
          senderId: context.user.id
        }).countDocuments();
      }
    },
    mates: {
      type: userConnectionType,
      args: createConnectionArguments(),
      resolve: async (_, args, context) => {
        if (!context.user) {
          return null;
        }
        const { user } = context;
        const queryParams = {
          $and: [
            {
              _id: { $ne: user.id }
            }
          ]
        };
        return await findUsers(args, queryParams);
      }
    },
    feed: {
      type: conversationConnectionType,
      args: createConnectionArguments(),
      resolve: (parent, args, context) => {
        if (!context.user) {
          return null;
        }
        const { user } = context;
        const queryParams = {
          $and: [
            {
              recipients: {
                $in: [user._id]
              }
            }
          ]
        };
        return findConversations(args, queryParams);
      }
    }
  }),
  interfaces: [nodeInterface]
});

export default viewerType;
