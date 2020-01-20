import mongoose from 'mongoose';
import Conversation from '../../../db/models/Conversation';
import {
  applyPagination,
  limitQueryWithId
} from '../../../db/helpers/pagination';

export const findConversations = async ({ first, last, before, after, order }) => {
  const query = limitQueryWithId({
    query: mongoose.model('Conversation').find(),
    before,
    after,
    order
  });
  const pageInfo = await applyPagination({ query, first, last });
  return {
    query,
    pageInfo
  };
};
