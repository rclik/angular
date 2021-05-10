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

## Event-Binding Kullanarak Sepete Ekleme Butonuna Islem Yapabilme Yeteneginin Kazandirilmasi

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

## 3rd Party JS Library lerinin Application a Eklenmesi

*Application* larda, **3rd party JS library** leri eklenmesi gerekebilir. Ornek olarak bizim uygulamamizda *AlertifyJs* i application imiza ekleyecegiz.

AlertifyJs, pop-up olarak mesaj gostermeyi saglayan bir kutuphanedir.

Ilk olarak uygulamamiza AlertifyJs kutuphanesinin eklenmesi gerekir. Bu islem package.json a eklenerek de yapilabilir, ya da ayni dizinde;

>npm install alertifyjs

Library eklendikten sonra node_modules un altina library kodlari gelir.

AlertifyJs adi ustunde js library sidir. Ayrica icinde css de barindirir. Yani JS ve CSS dosyalarinin da uygulamaya eklenmeesi gerekir. Bu dosyalarin uygulamanin her tarafindan ulasilabilir olmasi icin ikisi de global olarak eklenmesi gerekir. Bundan once bootstrap ve font-awesome library lerinin CCS lerini eklemistik (genel style.css dosyasina). Ama burada durum biraz farkli. Cunku angular da style.css gibi genel bir js dosyasi yok. Onun icin, genel style.css dosyasinin project e tanimlandigi yere yani angular.js dosyasini aciyoruz. Bu dosya src dosyasiyla ayni yerdedir. Bu dosya project hakkindaki tum dosyalari tutar. Genel style.css dosyasi da onlardan biridir.
Orada;

```html
....
        "styles": [
            "src/styles.css"
        ],
        "scripts": [],
        "es5BrowserSupport": true
    },
....
```

Burada gordugumuz sudur, global **styles.css** dosyasi, project e `styles` tanimlanmistir. Benzer sekilde AlertifyJs in JS dosyasini da projeye `scripts` property si araciligiyla eklenebilir.

```html
....
        "styles": [
            "src/styles.css"
        ],
        "scripts": ["./node_modules/alertifyjs/build/alertify.min.js"],
        "es5BrowserSupport": true
    },
....
```

Folder in yerini ise AlertifyJs in sitesinden de bulabilirsin ama *node_modules* un altindan da bulabilirsin.

Sonra AlertifyJs icin gerekli olan css dosyalarini da import edelim. Tabii bunlari genel *style.css* dosyasina direk import edicez:

```css
    @import '~alertifyjs/build/css/themes/bootstrap.min.css';
    @import '~alertifyjs/build/css/alertify.min.css'
```

Bu sekilde AlertifyJs in JS ve CSS dosyalarini projeye ekledik. Simdi, sepete bir urun eklendiginde islemi pop-up ile ekranda gosterelim. Onu da `product.component.ts` icerisinde `alertify` object ine ulasarak yapicagiz. Ama simdi `alertify` e nasil ulasiriz, onu bulmamiz lazim. O da soyle, `declare` keyword u ile yapiyoruz. Bu keyword, 3rd party library lerde bulunan object lere bakilirak map leme islemi yapilir. `product.component.ts` de global olarak tanimi ekleyelim;

```typescript
declare let alertify: any;
```

Sonrasinda artik alert yerine `alertify.success` method unu kullanarak ekranda pop-up un gosterilmesini sagliyoruz.

```typescript
...

declare let alertify: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit { 

  success(message: string): void {
    alertify.success(message);
  }
...
```

> **Dikkat**, yeni bir library eklendiginde, project in build edilmesi gerekiyor. Bu yuzden ng serve u kapatip acmak gerekiyor. Yani terminal den restart lazim.

JS ler icin de genel bir JS file i olsa ne olurdu? JS de bir JS file dan baska JS file i import etmek normalden zor bir islem oldugu icin bu sekilde yapislar JS in module yapisi kullanilmasi gerekir. Yoksa sorunlar cikabiliyor. Diger method lar ise biraz zorlama gibi. ama yine de arastirilabilir.

## Angular Service Kullanrak AlertifyService Yazilmasi

Bir fonksiyonalitenin tekrar tekrar, farkli component ler tarafindan kullanilabilirligi arttirmak icin Angular `service` ler kullanilir.
Javadaki service yapisiyla benzerdir, singleton veya component specific olabilir.

Uygulama icin;

- App altina yeni bir folder create et, ismi `services` olsun.
- Sonra services folder ina locate olduktan sonra su komut kos:
    ng g service alertify

ng komutunu kostuktan sonra neler oldu:

- <service_name>.service.spec.ts adinda service test class i olusturuldu.
- <service_name>.service.ts adinda da bir service class i olusturuldu.
- olusturululan service ismi is <service_name>Service olarak olusturuldu. Bizim senaryomuzda: *AlertifyService*

Bu sekilde bir service nasil yazildigini gormus olduk. Simdi AlertifyJs icin bir service yazalim, cunku AlertifyJs tum component lar tarafindan kullanilibilir olmasini istiyoruz.

### Angular Service Incelenmesi

*Service* bir class dir, bu class *Injectable* decorerator ini icerir. *Injectable* declaration icinde **providedIn** property si bulunur. Bu da bu object in hangi scope da olusturulacagini soyler. Ornegin bu service root icin, yani global olarak eklenmistir (Application da bir tane, Singleton gibi). Service component bazli olarak da olusturulabilir.

Her service i global yapsak? Olmaz, birincisi gereksiz yere object tutabiliriz. Ikincisi bazi component larin service lerde yaptigi is, kendisine ozel kalmasi gerekebilir. Bu durumda da sorun olurdu.

Tamam, simdi **AlertifyService** inin success fonksiyonu olustur. Oraya bir mesaj gonder, onu da alerify object ini kullanarak ekrana bastir. Alertify object ini declare etmistin, daha once yaptigimiz gibi.

```typescript
import { Injectable } from '@angular/core';

declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  success(message: string): void {
    alertify.success(message);
  }

}
```

Service i yazdim, simdi bunu bir *component* dan kullanmamiz gerekiyor. Bu islem icin **AlertifyService** ini kullanicagimiz component class ina inject etmemiz gerekiyor. Sonradainda service function larini component dan kullanilabilir hale gelicegiz.

**Dependency injection** icin *component* class inin constructor una parametre olarak bu service i vericegiz. Sonra Angular component constructor unda service parametresini gorunce, ilk olarak kendi class indaki `@Component` declaration inin `providers` property sinie bakicak. Eger bu service orada tanimlanmissa, component *a ozel bir tane service* **(local service)** olusturacak sonra da component a inject edicektir. Eger yoksa, projenin nin global context inde bu service object i tanimlanmis mi diye bakicak. Eger tanimlanmissa, o object i component a inject edecektir. Eger global da da yoksa hata verecektir. Ornegin `product.component.ts`

```typescript
        ....
        constructor(private alertifyService: AlertifyService){

        }
        ....
```

Sonrasinda `product.component.ts` de artik service den ekrana mesaj basicaz:

```typescript
    ...
    addToCard(message: string){
        this.alertifyService.success(mesaj);
    }
    ... 
```

Burada AlerifyJs global bir service oldugu `provider` olarak eklemedik.

Bir service i global olarak eklemek icin;

- `Injectable` declaration icindeki `providedIn` property si service objesinin **root** olarak verebiliriz. Ama bu yeni angular version ininda gecerli. Eskilerde farkli bir yaklasim var.
- `app.module.ts` class icindeki `NgModule` deki object icindeki `providers` array ine service i ekleyebiliriz. Bu eski yaklasimdir. Ama eger, global service leri bir yerden gormek istersen bu yaklasim daha iyidir. Ornegin `product.component.ts`;

```typescript
...
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [AlertifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
...
```

> Ikinci yontem ile service i tanimlasan bile, Injectable declaration ini kaldirmaman gerekir, cunku Angular, service i bu annotation ile taniyor.

Bir service i local olarak eklemek icin ise; *component* class indaki `@Component` declaration ina providers property sine eklenir.

```typescript
        ...
        @Component({
            selector: 'app-product',
            templateUrl: './product.component.html',
            styleUrls: ['./product.component.css'],
            providers:[AlertifyService]
        })
        ...
```

### Global ve Local Service Farkliliklari

Global service, browser dan application acildiginda, kullanilip kullanilmayacagina bakilmaksizin Angular tarafindan olusturulur ve global context e eklenir. Bir tane instance i vardir.

Local service ise component specific olusturulurlar. Burada onemli bir nokta var; eger component specific bir service i kullaniyorsan, her component icin ayri service object i olusturulur. Buna dikkat. Yoksa farkli sonuclar alinabilir.

## JSON Server Yapilandirilmasi

Backhand de data lari cekmek icin buildin bir server kullanalim. Bu islem icin npm package i kullanacagiz. Bu package in ismi, `json-server`. Kurmak icin;

> npm install -g json-server

Kurulumu yaptiktan sonra, serve edilecek data nin olusuturmasi lazim. Bunun icin bir tane `shop.json` olustur. Bu bir *json* object barindirsin. Bu json da endpoint ler ve bu endpoint ler istenince donuecek json data lar olacak.

Kurduktan sonra o json i serve etmek icin:

> json-server --watch shop.json

## REST API Kullanilarak Uygulamaya Bilgi Saglamak

Backend in sundugu data lari uygulamamizda kullanacagiz. Bu islem icin, `HttpClientModule` u kullancagiz. Bu Angular in sundugu bir **module**dur. Ilk olarak onu uygulamada kullanacagimiz Angular a belirtmemiz lazim. Bunun icin **module** u `app.module.ts` kullanarak import edelim:

```typescript
...
import { HttpClientModule } from '@angular/common/http';
...

imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
],
...
```

Simdi, server tarafindan sunulan urunleri uygulamada gosterelim. Bunu yapmak icin, *ProductComponent* class indaki products property sinin artik server dan alinan data ile guncellememiz gerekiyor. Bu islem icin ilk is, *HttpClientModule* icinde bulunan **HttpClient** sinifinin *ProductComponent* class ina inject edilmesidir.

deki class property olan products i elle vermek yerine rest api uzerinden alicagiz. Bunun icin ise httpclient i product.component.ts e inject etmemiz lazim. `product.component.ts` class inda;

```typescript
...
constructor(private alertifyService: AlertifyService, private httpClient: HttpClient) { }
...
```

Sonrasinda `httpClient` objesini, class da var olan **ngOnInit** method u icinde yapariz. Cunku bu method component ilk load olurken cagirilir. Bu method ayrica class in impement ettigi OnInit interface inden gelir. `product.component.ts`:

```typescript
...
ngOnInit() {
    this.httpClient.get<Product[]>("http://localhost:3000/products").subscribe(data => { this.products = data });
}
...
```

Bu yapilan islem:

- HttpClient objesinin *get* method una subscribe olmak. Bu su demek; get method u verilen *url* e *HTTP GET* request i atiyor. **subscribe** method u ise atilan request in sonucunda gelen response un subscribe method u icerisine verilen function araciligiyla islenmesini sagliyor.
- *get* method unun ekledigimi generic class gelen response un product array tipinde oldugunu belirtmek icindir. Bu sekilde subscribe method u icine gelen response data nin Product array ine cast edilir. *Type safety* islemini saglamis olduk.

## HTTP Islemleri icin Service Olusturmak

Product lari ceken API islerini service inde halledersek daha iyi olacak, moduler bir yapiya sahip olacak project imiz. Hemen bir service olusuralim, services dizini altinda;

> ng g service product

Bu service *ProductComponent* ina ozel olsun, diger component larda gerekli olmadigi icin. Local bir service olusturmak icin **Injectable** declation ini icindeki **providedIn** property sini silelim. Sonrasinda ise ProductComponent icindeki **Component** declaration ina **providers** array property sine service i ekle.

Local service olabilir ama Injectable declaration ini kullanman gereklidir cunku Angular bu declaration ina gore Bu class in bir service oldugunu anlar.

Simdi Http Islemlerini service e alalim. Bunun icin product lari service den alan methodu bu service e almak lazim.**subscribe** isini yine component e birak cunku service in isi data yi getirmek, gelen data nin ne yapilacagi component a ait.

Ayrica *httpClient* i hicbir zaman component da kullanma, data yi getiren tarafda yani service de kullan.

HttpClient i service e tasiyoruz;

- Service i component a inject ediyoruz.
  - Service de getProducts method u yaziyoruz. Bu method component icin *http* request i yapacak ama subscribe isini yine component yapacak. Bunun boyle olmasinin nedeni ise data yi kullanacak olanin yine component olmasi. hata da olsa onu component halletmelidir.
  - Simdi, component in subscribe method unu kullanabilmesi icin getProducts method u Observable<Product[]> tipinde return u olmalidir. onu da ekledigimiz de service metod umuz:
  
    ```typescript
        ...
        getProducts(): Observable<Product[]> {
            return this.httpClient.get<Product[]>(this.path);
        }
        ...
    ```

  - Sonrasinda bu service i ProductComponent da call ettik ve ngOnInit method unda ise service uzerinden getProducts method unu call ederek products object ini doldurduk.
  - Service i root yapmadigimiz icin ise `product.component.ts` class inda Component declaration ininda providers olarak service i tanimladik:

    ```typescript
        ...
        @Component({
          selector: 'app-product',
          templateUrl: './product.component.html',
          styleUrls: ['./product.component.css'],
          providers:[ProductService]
        })
        ...
    ```

Burada onemli bir durum var. Biz service den method u cagirdiktan sonra subscribe method unu kullanip gelen data yi isledik. JS bunu yaparken aslinda service method unu call eder etmez, http request in response unu beklemeden bir alt satira geciyor. Buna reaktif programlama denir. Soyle yaptik;

- ngOnInit method unun son line ina console.log  ile log bastridik; loading bitti diye, ayni zamanda subscribe method unun icine de log bastirdik, data geldi diye. sonra log lara baktik ki, ngOnInit daha once basilmis.

## HTTP Hatalarinin Ayiklamanmasi

Log lama islemi de, errorAyiklama islemi de httpClient a bagli olarak yapilabilir. Cok guzel bir uygulamasi var. Service method u icinde http get method unu kullandik. Hemen sonuna **pipe** method unu kullanabiliriz. **pipe** method u **iki tane callback method** icine alir, subscribe daki tek callback method uydu. Bunlardan biri **tap**, icincisi ise **catchError** method u dur. tap method u log lama vb. isler icin kullanilirken, catchError error ciktiginda yakalamak icin kullanilir.

Soyle dusunelim, request attik, response bekliyoruz ama reactive sekilde (yani browser thread i block lanmamis)

Method call siralamalari bu sekildedir.

> get -----> tap -----> catchError -----> subscribe

**tap** ve **catchError** method larini kullanabilmek icin aslinda o method lari import etmemiz gerekiyor ve sonra **catchError** da **error** u yakalayip baska bir error da atabiliriz. Bunun icin;

```typescript
import { Observable, throwError } from 'rxjs'
import { tap, catchError } from 'rxjs/operators';

...

getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.path).pipe(
    tap(),
    catchError(this.handleError)
    );
}

private handleError(handleError: HttpErrorResponse) {
    let errorMessage = '';
    if (handleError.error instanceof ErrorEvent) {
    errorMessage = 'Bir hata olustu: ' + handleError.message;
    } else {
    errorMessage = 'Sistemde bir hata olustu'
    }
    return throwError(errorMessage);
}

...
```
