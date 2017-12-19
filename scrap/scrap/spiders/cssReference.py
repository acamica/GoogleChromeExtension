# -*- coding: utf-8 -*-
import scrapy

properties = ["align-content","align-items","align-self","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","animation","background-attachment","background-clip","background-color","background-image","background-origin","background-position","background-repeat","background-size","background","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","","border-bottom","border-collapse","border-color","border-left-color","border-left-style","border-left-width","border-left","border-radius","border-right-color","border-right-style","border-right-width","border-right","border-style","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-top","border-width","border","bottom","box-shadow","box-sizing","box-model","clear","color","column-count","column-gap","column-width","content","cursor","display","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","float","font-family","font-size","font-style","font-variant","font-weight","font","height","justify-content","left","letter-spacing","line-height","box-model","list-style-image","list-style-position","list-style-type","list-style","margin-bottom","margin-left","margin-right","margin-top","margin","max-height","max-width","min-height","min-width","mix-blend-mode","opacity","order","outline-color","outline-style","outline-width","outline","overflow-wrap","overflow-x","overflow-y","overflow","padding-bottom","padding-left","padding-right","padding-top","padding","pointer-events","position","resize","right","text-align","text-decoration","text-indent","text-overflow","text-shadow","text-transform","top","transform-origin","transform","transition-delay","transition-duration","transition-property","transition-timing-function","transition","vertical-align","white-space","width","will-change","word-break","word-spacing","z-index"]

class QuotesSpider(scrapy.Spider):
    name = "propiedad"

    def start_requests(self):
        yield scrapy.Request(url='http://cssreference.io/property/', callback=self.parse)

    def parse(self, response):
        td = response.xpath('//span')
        # # Every element is inside an 'a' tag
        for elem in response.xpath('.//a[contains(@href, "/es/docs/Web/HTML/Elemento/")]'):
            # Construction of the elements, they contain a reference, a description, a name and an example
            element = {
                'name': elem.xpath('./node()').extract_first(),
                'reference': 'https://developer.mozilla.org' + elem.css('a').xpath('@href').extract_first(),
                'description': elem.css('a').xpath('@title').extract_first(),
                'language': 'html',
            }
            # New request to get the example of every element
            exReq = scrapy.Request(url=element['reference'], callback=self.example)
            exReq.meta['element'] = element
            yield exReq

    # Example request
    def example(self, response):
        element = response.meta['element']
        newExample = {
            'image': ''
        }
        newExample['code'] = response.xpath('//pre/node()').extract_first();
        element['example'] = newExample
        return element