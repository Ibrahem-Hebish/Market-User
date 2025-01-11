import { IBoughtProduct } from "./boughtProduct";

export interface ICart{
 userId:number;
 date:Date;
 products:IBoughtProduct[];
}
