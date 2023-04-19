import { typesOfData } from "../constant";

export type fieldType = {
  [key: string]: {
    type: typesOfData;
    required: boolean;
    name: string;
    childIds: string[];
    parentId: string;
  };
};