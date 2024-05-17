import type { BaseModel } from "~/model/model";
import { v4 as uuid } from "uuid";

export default function addIdIfMissing(value: BaseModel) {
  if (!value.id) {
    value.id = uuid();
  }
}
