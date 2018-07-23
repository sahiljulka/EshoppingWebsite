import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProd'
})
export class SearchProdPipe implements PipeTransform {


  transform(value: {'title':string,'category':Number,'imageURL':string,price:Number}[], args?: any): any {
    if(args==null)
      return value;
    else
      return value.filter(a=>a.title.toLocaleUpperCase().startsWith(args.toLocaleUpperCase()));
  }

}
