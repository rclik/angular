import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  // gelen product lar icerisinden, filterText e sahip olanlari donecegiz.
  transform(products: Product[], filterText: string): Product[] {
    if (!filterText) {
      return products;
    }

    filterText = filterText.toLocaleLowerCase();

    return products.filter( (product: Product) => product.name.toLocaleLowerCase().indexOf(filterText) !== -1);
  }

}
