import { fromGlobalId, nodeDefinitions } from 'graphql-relay';
import User from '../../../db/models/User';
import Message from '../../../db/models/Message';
import Conversation from '../../../db/models/Conversation';

const getUser = async userId => {
  console.log('getUser');
  const user = await User.findById(userId, { password: 0, jwt: 0 });
  return user;
};

const getViewer = async userId => {
  console.log('getViewer');
  const user = await User.findById(userId, { password: 0, jwt: 0 });
  user.isViewer = true;
  return user;
};

const getMessage = async messageId => {
  console.log('getMessage');
  return Message.findById(messageId);
};

const getConversation = async conversationId => {
  console.log('getConversation!');
  return Conversation.findById(conversationId);
};

export const { nodeInterface, nodeField } = nodeDefinitions(async globalId => {
  const { type, id } = fromGlobalId(globalId);
  console.log('id ->  ', id);
  console.log('type -> ', type);
  if (type === 'Viewer') {
    return getViewer(id);
  }
  if (type === 'User') {
    return getUser(id);
  }
  if (type === 'Conversation') {
    return getConversation(id);
  }
  if (type === 'Message') {
    return getMessage(id);
  }
});
