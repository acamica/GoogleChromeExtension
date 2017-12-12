# -*- coding: utf-8 -*-
import scrapy

class QuotesSpider(scrapy.Spider):
    name = "elemento"

    def start_requests(self):
        yield scrapy.Request(url='https://developer.mozilla.org/es/docs/Web/HTML/Elemento', callback=self.parse)

    def parse(self, response):
        td = response.xpath('//td')
        # # Every element is inside an 'a' tag
        for elem in response.xpath('.//a[contains(@href, "/es/docs/Web/HTML/Elemento/")]'):
            # Construction of the elements, they contain a reference, a description, a name and an example
            # print elem.xpath('./node()').extract_first()
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
        # newExample['code'] = response.css('pre::text').extract_first()
        newExample['code'] = response.xpath('//pre/node()').extract()
        element['example'] = newExample
        return element