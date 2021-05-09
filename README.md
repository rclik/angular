# Genel Giris

Bu proje angular ogrenmek icin gelistirildi.

## Angular project leri icin kullanilan komutlar

### Project in calistirilmasi

> ng serve

Bu komut, project in 4200 port u uzerinde calistirilmasini saglar. Su linke tiklayabilirsin `http://localhost:4200/`.

Istersek bu komutu geslitirebiliriz, calistirilinca uygulamanin browser uzerinde calistirilmasi icin `--open`, istedigimiz bir port da calisitirilmasini saglamak icin `--port <port>` komutlarini kullanabiliriz.

> ng serve --port 5500 --open

## Angular CLI Kullanarak Angular Elemanlarinin Olusturulmasi

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Shop

## 1- Component larin Olusturulmasi

Uygulamamizda 3 tane component olacak, onlari olusturalim;

Project dizini altinda asagidaki komutu kullanarak, product, category ve nav component larini ekleyelim;

>ng g component <component_name>

Herbir component olusuturuldugunda sunlar oluyor;

- `<component_name>` i kullanarak `app` folder i aldinda bir folder olusturuyor. (folderName -- folder-name)
- bu folder altinda `component-name.component.ts`,`component-name.component.html`, `component-name.component.spec.ts`, `component-name.component.css` dosyalarini olusturur.

- Bu component i `app.moudule.ts` icinde declare eder. Bu sekilde Angular Component i tanimis olur.

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { NavComponent } from './nav/nav.component';
import { CategoryComponent } from './category/category.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    NavComponent,
    CategoryComponent,
    ProductFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Ana project deki `app.component.html` in icerigini silebiliriz. Sadece `router-outlet` tag i kalsin. Cunku isimize yaramiyacaklar, digerlerini yeniden olusturacagiz.

Yeni yaratilan tum component lari oraya ekle:

```html
<app-nav></app-nav>
<app-category></app-category>
<app-product></app-product>

<router-outlet></router-outlet>
```

> Bu kadariyla app icinde tum component ler gosterilecek. Burada su sekilde yazarsan calimiyor, `<app-nav />` dikkat et. Acilip kapananacak sekilde yazilmasi gerekiyor.

## Bootsrap in kurulmasi

Projede Bootstrap i kullanicaz, onun icin ilk olarak project e Bootstrap i ekleyelim;

> npm install bootstrap
> 
> npm install font-awesome

Sonrasinda ise bu css lerin, node module leri uzerinden project in tamamindan ulasilabilir olunmasi icin `style.css` dosyasina import edelim;

```css
@import '~bootstrap/dist/css/bootstrap.min.css';
@import '~font-awesome/css/font-awesome.min.css';
```

## Nav Bar in Guncellenmesi

Nav icin bootstrap i kullanicaz;

Ilk olarak bootstrap den bir nav ornegi bulalim internet uzerinden. Sitesine gidip:
`documnetation -> component -> navbar` alitindan bir nav ornegi bul. Buradan nav bar in code unu kopyala nav.component.html icine yapistir.
Save ettikten sonra browser uzerinden goruntuye bakinca eksik css ler yoksa guzel bir goruntu gorunecek.

## Single Page in Bolumlendirilmesi

Category ve product component leri sayfa icinde yan yana Nav ise uzerlerinde gosterilmesini istiyoruz. BU sekilde daha guzel bir goruntu elde edebiliriz;

onun her component i bir div e koyuyoruz ve category ve product i ayrica bir div icine alalim. oranlama icinde bootstrap i kullanalim.
yana yana olmalari icin ortak div e bootstrap in row class ini verelim. Icindekilere de oranlari verelim.
yanyana duran div ler icin bir oran vermemiz lazim. bootstrap ekrani 12 parcaya boler onun icin category component 3 luk product ise 9 luk olsun;

```html
<!-- newly added components are here -->
<app-nav></app-nav>
<!-- main div -->
<div class="row">
    <!-- category div -->
    <div class="col-md-2">
        <app-category></app-category>
    </div>
    <!-- product div -->
    <div class="col-md-10">
        <app-product></app-product>
    </div>
</div>

<router-outlet></router-outlet>
```

## Urunlerin Listelenmesi

Product component i kisminda product larin gosterimesini saglamamiz lazim. Bunun icin ilk olarak bir tane product gostermek icin islem yapalim. Sonrasinda cogullariz.

Onun icin bootstrap de `documantation -> components -> card` kismina gidip oradan uygun bir card css template i alalim:
Sonra copy ettigimiz code u `product.component.html` e yapistiralim. Basina da bir de `h3` ile baslik atalim:

```html
<h3>Urun Listesi</h3>
<div class="card" style="width: 18rem;">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.
        </p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
</div>
```

Simdlik bundan 7 tane koyalim, 7 urunumuz var. 7 sini de bir div icine koyalim, bu div in class i da olsun. o da row olsun. boylece ekrana yan yana gosterecek:

```html
<div class='row'>
    ...
</div>
```

Simdi ise `product` i `product.component.ts` dosyasindan alamaya calisilim. O zaman component class ina oncelikle bu object leri eklememiz lazim;

```typescript
export class ProductComponent implements OnInit {

// these are class properties to be used in html file
title: string = 'Urunler Listesi';
products: any[] = [
    { id: 1, name: 'LapTop', price: 2500, categoryId: 1, description: 'Asus Zenbook' },
    { id: 2, name: 'Mouse', price: 25, categoryId: 2, description: 'A4 Tech' }
];
...
```

buradaki `title` object ini de html de kullanicaz.

```html
<h3>{{title}}</h3>
```

Simdi ise, eger products object i dolu ise ekranda list in gosterilmesini isteyebiliriz. Bu islemi yaparken `angular directive` lerinden yararlanacagiz;

Html tarafinda class property lerine gore condition yazmak icin `ngIf` directive i kullanilir;

Kullanilirken, hangi html element i gosterilecek veya gosterilmeyecek ise ona `attribute` olarak e

```html
<h3 *ngIf="products">{{title}}</h3>
```

burada code ile `product.component.ts` de eger `products` objesi yoksa veya bossa h3 tag ini ekranda gostermeyecek: (undefined veya null ise basmaz)

Aslinda `ngIf` in kullanimi su sekilde ngIf=expression; yani expression kismina istegimiz expression i yazabiliriz ayni if check de oldugu gibi.

## Urun Yoksa ekrana baska bir goruntunun olusturulmasi (ng-template)

Eger products yoksa baska bir sey gostermek istiyorsak ng-template tag ini kullanabiliriz.

```html
<h3 *ngIf="products; else noProduct">{{title}}</h3>
<ng-template #noProduct>Bu kategory de urun bulunamadi</ng-template>
```

Burada yaptigimiz sey, ngIf i biraz daha gelistirmek. expression dan sonra ; koyup else kisminda ise gosterilecek ng-template i ismini vermek.

Ekran in daha guzel olmasi icin bir css de ng-template icin bulalim. `bootstrap -> component -> alerts` kismidan bir tane css al onu da html e ekle.
bu sekilde daha da guzel oldu.

## Gelen Tum Product lar i Card template i Kullanarak Dongu ile Ekranda Gosterilmesi

Dongu yapmak icin `ngFor directive` ini kullanabiliriz;

Neyi cogullayacaksak onun tag i ne `*ngFor` yazilabilir. Mesela bizim icin card div ini cogullamamiz lazim. Her card div i bir product a karsilik gelicek. Yapisi cu sekilde  `<div *ngFor="let item of items" >`

Burada component.ts deki items listesinin tum item lari icin bir dongu ile o div den olusturulur. Sadece div olmasina gerek yok, baska html tag leri de olabilir.
Olusan yeni object bu html element i icinde kullanilabilir;

```html
<div *ngFor="let product of products" class="card" style="width: 18rem;">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">{{product.name}}</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
            content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
</div>
```

## Type safe Calismak

`product.component.ts` icindeki any yerine baska bir class olusturulabilir,
bu class i olusturmak icin hangi component icin kullanilacaksa o folder altinda bir ts dosyasi ekliyoruz
>product.ts

Icine bize lazim olan property leri ekliyoruz.

Sonrasinda imageUrl i de html de gosterebilmek icin html kisminda eskiden src kisimi property bind kullanarak;

```html
<img src="..." class="card-img-top" alt="...">
```

Su sekilde gosterebiliriz;

bu kere onu angular dan alabilmesi icin:

```html
<img [src]="product.imageUrl" class="card-img-top"
```

sekline ceviriyoruz. bu sekilde de one-way binding yapabiliyoruz. Ya da su da calisir;

```html
<img src="{{product.imageUrl}}" class="card-img-top" alt="...">
```

seklinde de calisiyor.

>Dikat edersek, typescript class isimleri kucuk harfle basliyorlar.

## Category Ekleme

Category eklerken best practice olarak ilk, domain object ini olusturalim;

Ilk olarak `category.ts` olustur, id ve name i olsun.

Sonra, `category.component.ts` de `title` ve bir de `category` cinsinden array olusturalim
icini dolduralim.

`category.component.html` icine simdi oradaki list i populate edelim.
Daha guze bir hale getirmek icin bootstrap i kullanicaz, bunun icin bootstrap e gidip list group u deneyebilirsin: `documantation->components->list groups`

## Pipe larla Calismak

Genelde class lardan alinan object ler ile html leri kullanarak ekrana basiyoruz. Bu islemi yaparken `directive` leri kullanabiliyoruz. Directive ler cok yetenekli degiller, daha basit isler icin kullanilirlar. Ama bir object i ekranda gosterirken object uzerinde degisiklikler yapabilmemizi ve bunlari tum object lerde ayni sekilde kullanabilmemizi saglayan yapilar var. Bunlar da pipe lardir.

Ornegin; name i buyuk harfle gostermek istiyoruz o zaman:

```html
<h5 class="card-title">{{product.name | uppercase}} {{product.price}}</h5>
```

Bir pipe isareti ile `build-in` `pipe` i kullaniyoruz o kadar. Benzer sekilde `lowercase` i kullanabiliriz.
Para  icin `currency` yi kullanabiliriz. Default u dolar dir

```html
<h5 class="card-title">{{product.name | uppercase}} {{product.price | currency: "USD": false}}</h5>
```

Burada false yaparsak dolar isareti yerine USD yazar.

```currency: "USD": false: "1.2-2"```
nokta formatinda virgulden sonra iki basamak icin "1.2-2"

`currency: <param1>: <param2>: <param3>` seklinde currency pipe i calisiyor. demekki buna benzer biz de yazabiliriz.

## Custom Pipe Yazilmasi ve FormModule

Mesela turk parasi icin yeni birseyler ekleyecez. Ya da simdi yapacagimiz gibi bir filter yazacaz: yapacagimiz is bir text field ina yazdigimiz text e gore urunlerin getirilmesi. bunun icin custom pipe yazilmasi lazim. Bunu yapabiliriz.

Ama biz, bir form uzerinden girilen text e gore ekranda var olan `product` lari gostermek istiyoruz. Bunu pipe ile yapabiliz.
Pipe imiz, gelen `producs` object i uzerinde calismasi lazim. Sonra `filterText` e gore filtreleme yapicak;

`Product` a pipe yazacagimiz icin o product component in icinde pipe yazsak daha iyi bir uygulama olur.
Onun icin product icinde bir terminal ac. Sonra;

> ng g pipe productFilter

Ile pipe olustur.

Bu islem sonrasinda olanlar;

- `product-filter.pipe.ts` ve `product-filter.pipe.spec.ts` isminde iki tane file olusturdu.
- Class i ise `app.module.ts` e eklendi tabii ki declaration kismina. -- bu sekilde angular, html icinden bu pipe a ulasabilecek.

> Isimlendirme yaparken bizim pipe name ine dikkat edelim; productFilter generate edilen file isimleri bunun ilk buyuk harfe kadar olani aliyor arasina - ekliyor: `product-filter.pipe.ts`

Simdi Pipe class ina bakalim; @Pipe declaration i var. Icinde de pipe in name i belirtiliyor. Bu name ile html tarafinda call edilebilecektir.

```typescript
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
```

Bu method daki `value` gelen data ya karsilik gelir. Default olarak tipi `any` dir. Eger bunun tipini biliyorsak, onu degistirmemiz type-safe code yazmak icin gereklidir. ki bizim Pipe ugulamamizda bunu biliyoruz.
Aåyrica return edilecek data nin tipi de default olarak `any`, bunu da degistirmemiz gerek type-safe code yazmak icin.
Son olarak metod da any tipinde optional olan bir args parametresi var. bu ise pipe islimini yaparken baska parametrelere gore islini degistirebilmesini saglar. currency de `<param1> <param2>` vardi hatirlarsan. ilki hangi para birimi icin kullanililacagini belirlemek icin kullaniliyordu. bu optional oldundan istesen kullanmazsin dahi.

Bizim senaryomuzda filterlemek icin disaridan extra parameter alabiliriz; bunu `filterText` olarak alabiliriz, hatta tipini sadece string olarak degistirebiliriz ve de optional olmasin.

Bizim pipe `Product` `array` i alacak, ve `Product` `array` i return edicek. ona gore update ediyoruz.

Simdi bunu nasil kullanicaz:
bunun icin currency yi hatirla: `{{product.price | currency: USD: false}}`
Ayni bunda oldugu gibi, `... | productFilter: filterText` `filterText` i gonderiyoruz cunku o bizim search parametremiz ayni currency de oldugu gibi.

Biz bunu for dongusundeki products listesine uygulamamiz lazim. O zaman `product.component.html` deki ngFor ng-tag ine uygulayabilirz:

```html
 <div *ngFor="let product of products | productFilter : filterText" class="card" style="width: 18rem;">
```

Tabii buradaki `filterText` ve `products` property sini `product.component.ts` de define etmemiz lazim.

> Dikkat etmen gereken sey, pipe in ilk parametresi, sol kisimdaki object, digeri ise saginda kalanlar.

> Bu islemi html kisminda da yapmaya calisabiliriz, bir js ile ama angular kullandigimiz icin bunlara dikkat ederek kod yazmak daha iyidir.

> Bir diger nokta ise, html file inda pipe i import yapmiyoruz. bunu angular hallediyor. Onu da app.module.ts de pipe declare ederek kullanabiliriz.

Simdi `filterText` i ekran dan alacagiz, bunu yapabilmek icin `two-way-binding` kullanilir.

`Two-way-binding` icin `banana-model` denen bir yapi kullaniyoruz.
`product.component.html` daki `filterText` object i hem ui hem de class dan ulasilabilmeli, iki tarafdaki degisiklilerin birbirlerini etkilemeleri gereklidir. Yani two way binding bu object icin olacaktir.

Bunu soyle tanimlayabiliriz;

```html    [(ngModel)] = "filterText"
...
<input class="form-control" id="productName" placeholder="Arama metni giriniz" [(ngModel)] = "filterText">
...
```

Dikkat edersek, `two-way-binding` in html tarafi bir `input`, diger tarafi da `class property` sine isaret ediyor.
Bu sekilde input daki bir degisiklik class property sini, class daki bir degisiklik de input u gunceleyecektir.

Tabii ekrana da bir form elemani eklememiz lazim; Bunun icin ilk olarak bootstrap den git bir form icinden text field al. `documantation->components->forms` oradaki ilk div i almamiz bizim icin yeterli. Onu `product.component.html` e yapistir.

Two-way-binding in calismasi icin Angular FormModule unun import edilmesi lazim;

app.module.ts ac, FormsModule u imprt et:

``` typescript
import {FormsModule} from '@angular/forms';
.... 
,
imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
],
```

Tam koda bakilabilir.

## Event-Binding Kullanarak Sepete Ekleme Butonuna Islem Yapabilme Yeteneginin Kazandirilmasi.

Html tarafindaki bir input vb. elementlerin event lari (onClick, onMouseOver gibi) component in class inda nasil handle edebiliir?

Ornegin; bir urunu sepete eklme icin bir buton ekledik. Bu butona basinca bu urun sepete eklenmesini istiyoruz. Bu islemi yapabilmek icin normalde, html de normal bir buton olusturduktan sonra, onClick event ine bind olan bir JS fonksiyonu kullanacaktik. Ama Angular in kendisinin ayri bir html yapisi oldugu icin, bu islemi Angular in anlayacagi sekilde yapmamiz gerekir. Iki islemde de yapilan islemler aynidir. Ama yapilma sekilleri farklidir;

Butonun yerine bir `a` tag i kullanalim. Sonrasinda bu `a` tag inin click event ine bind olmak icin ise asagidaki gelisitirmeyi ekleyelim.

```html
<a (click) = "addToCart()" class="btn btn-primary">Add to Cart</a>
```

Burada dikkat edilmesi gereken, `click` event ine bind olmak icin kullanilan parantezlerdir. `(click) = "addToCard()"` bu sekilde `a` taginin click eventine bind oluyoruz cunku Angular in anlayacagi bir gelistirme yapiyoruz.

Sonuc olarak soyle bir kod ortaya cikiyor.

```html
<div class="row">
<ng-template #noProduct>
    <div class="alert alert-primary" role="alert">
    Bu kategory de urun bulunamadi
    </div>
</ng-template>
<div *ngFor="let product of products | productFilter : filterText" class="card" style="width: 18rem;">
    <img [src]="product.imageUrl" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">{{product.name | uppercase}} {{product.price | currency: USD: false}}</h5>
    <p class="card-text">{{product.description}}
    </p>
    <a (click) = "addToCart()" class="btn btn-primary">Add to Cart</a>
    </div>
</div>
</div>
```

Html tarafini hazirladiktan sonra, component class (`product.component.html`) ina, `addToCart` methodunu yazmamiz gerekir. Yoksa hata verecektir. Sonrasinda `a` tagine tiklaninca bu method call edilecektir.

Eger sepete eklenecek urunu de fonksiyona gecmek istersek, sadece `(click) = "addToCart(product)"` seklinde methoda parameter eklememiz yeterlidir. Cunku o **ngIf directive** **closure** `product` object ulasilabilirdir.

Bu arada bu islem, `(click) = "addToCart()"` one-way-binding olarak gecer. Sadece template kismindan class kismina gecis saglanir.
