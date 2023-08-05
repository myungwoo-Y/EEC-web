import { Post as SPost } from "@/../server/src/model/post.entity";
import { Comment as SComment } from "@/../server/src/model/comment.entity";

export type Post = NestedSwapDatesWithStrings<SPost>;
export type Comment = NestedSwapDatesWithStrings<SComment>;

