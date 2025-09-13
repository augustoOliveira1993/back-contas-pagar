import { Document, Model, Schema } from 'mongoose';
export type SetParentOnChildrenOptions = {
  parentField: string;
  childrenField: string;
  childModel: Model<any>;
};

export function setParentOnChildren<T extends Document>(
  schema: Schema,
  options: SetParentOnChildrenOptions,
) {
  schema.post('save', async function (doc: any) {
    if (doc[options.childrenField]?.length) {
      await options.childModel.updateMany(
        { _id: { $in: doc[options.childrenField] } },
        { $set: { [options.parentField]: doc._id } },
      );
    }
  });
}
