# -*- coding: utf-8 -*-
import scrapy

properties = ["align-content","align-items","align-self","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","animation","background-attachment","background-clip","background-color","background-image","background-origin","background-position","background-repeat","background-size","background","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","","border-bottom","border-collapse","border-color","border-left-color","border-left-style","border-left-width","border-left","border-radius","border-right-color","border-right-style","border-right-width","border-right","border-style","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-top","border-width","border","bottom","box-shadow","box-sizing","box-model","clear","color","column-count","column-gap","column-width","content","cursor","display","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","float","font-family","font-size","font-style","font-variant","font-weight","font","height","justify-content","left","letter-spacing","line-height","box-model","list-style-image","list-style-position","list-style-type","list-style","margin-bottom","margin-left","margin-right","margin-top","margin","max-height","max-width","min-height","min-width","mix-blend-mode","opacity","order","outline-color","outline-style","outline-width","outline","overflow-wrap","overflow-x","overflow-y","overflow","padding-bottom","padding-left","padding-right","padding-top","padding","pointer-events","position","resize","right","text-align","text-decoration","text-indent","text-overflow","text-shadow","text-transform","top","transform-origin","transform","transition-delay","transition-duration","transition-property","transition-timing-function","transition","vertical-align","white-space","width","will-change","word-break","word-spacing","z-index"]

class QuotesSpider(scrapy.Spider):
    name = "propiedad"

    def start_requests(self):
        for elem in properties:
            yield scrapy.Request(url='http://cssreference.io/property/' + elem, callback=self.parse)

    def parse(self, response):
        name = response.css('h2').css('a::text').extract_first()
        code = response.xpath('//div[contains(@class, "example-output-div")]').extract_first()
        generalStyle = "".join(response.xpath('//section[contains(@class, "property")]/style').extract())
        if generalStyle is None:
            example = code
        else:
            example = generalStyle + code
        style = response.xpath('//section[@class= example]/style').extract()
        element = {
            'name': name,
            'reference': 'https://cssreference.io/property/' + name,
            'description': response.xpath('//div[@class= "property-description"]').xpath("string(.//p)").extract_first(),
            'language': 'css',
            'example': {
                'show': 'yes',
                'image': response.xpath('//code[@class= "example-value"]/@data-clipboard-text').extract_first(),
                'code': generalStyle + code,
            }
        }

        yield element