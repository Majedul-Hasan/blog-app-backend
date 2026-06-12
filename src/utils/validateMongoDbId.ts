import { InternalServerError } from '@shared/errors/common/InternalServerError';
import mongoose from 'mongoose';

const validateMongodbId = (id: string) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new InternalServerError('The id is not valid or does not exist.');
};

export default validateMongodbId;
