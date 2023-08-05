import { Post as SPost } from "@/../server/src/model/post.entity";

export type Post = NestedSwapDatesWithStrings<SPost>;