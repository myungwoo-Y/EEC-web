import { Application as SApplication } from "@/../server/src/model/application.entity";

export type Application = NestedSwapDatesWithStrings<SApplication>;

export type CheckedApplication = Application & { checked: boolean};