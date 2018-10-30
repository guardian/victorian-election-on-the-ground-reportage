import voxplate from '../../templates/voxpop.html'
import { $, $$, round, numberWithCommas, wait, getDimensions } from '../modules/util'
import Ractive from 'ractive'
import * as d3 from 'd3'
Ractive.DEBUG = false;

export class Voxbox {

	constructor(data,settings) {

		var self = this

		this.electorate = settings[0].electorate
		this.settings = {"title": settings[0].title, "standfirst": settings[0].standfirst}
		this.order = ['positive', 'indifferent', 'negative']

		this.responses = {

			months : self.sortByColumn('date', data)

		}


		for (var i = 0; i < this.responses.months.length; i++) {

			self.responses.months[i].values = self.mapOrder(self.responses.months[i].values, self.order, 'mood')

			for (var ii = 0; ii < self.responses.months[i].values.length; ii++) {

				self.responses.months[i].values[ii].index = i

				self.responses.months[i].values[ii].content = false

			}

		}

		this.ractivate()
		
	}

	ractivate() {

		var self = this

        this.ractive = new Ractive({
            el: '#vox_widget',
            data: {"responses":self.responses,"settings":self.settings},
            template: voxplate
        })

        this.ractive.on('activate', (context, group, item) => {

			for (var i = 0; i < self.responses.months.length; i++) {

				for (var ii = 0; ii < self.responses.months[i].values.length; ii++) {

					self.responses.months[i].values[ii].content = false

				}
				
			}

			self.responses.months[group].values[item].content = true

        	self.ractive.set({"responses":self.responses, "settings":self.settings})

        })

        //headshot_block

        var trigger = document.getElementsByClassName("headshot")[0];

        trigger.click();

        this.social()

	}

    sortByColumn(column, data) {

        var self = this

        var array = d3.nest()
            .key(function(d) { return d[column]; })
            .entries(data);

        return array

    }

    mapOrder(array, order, key) {
      
		array.sort( (a, b) => {
		
			var A = a[key], B = b[key];

			return (order.indexOf(A) > order.indexOf(B)) ? 1 : -1 ;

		});

		return array;
    }

    facebook() {

		var pagelink = "https://www.theguardian.com/australia-news/ng-interactive/2018/oct/28/victorian-election-2018-on-the-ground-in-morwell-part-one"

		var title = "Victorian election 2018: On the ground in " + self.electorate;

		var params = {
		  method: 'feed',
		  name: title
		};

		console.log(params);
		FB.ui(params, function(response) {});
	}

    twitter() {

    	var self = this

		var pagelink = "https://www.theguardian.com/australia-news/ng-interactive/2018/oct/28/victorian-election-2018-on-the-ground-in-morwell-part-one"

		var message = "Victorian election 2018: On the ground in " + self.electorate;

		var twitter_results = 'https://twitter.com/intent/tweet?url='+ encodeURIComponent(pagelink) + '&text=' + encodeURI(message);

		window.open(twitter_results, '_blank');

    }

	social() {

		var self = this

		var share_buttons = document.getElementsByClassName("interactive-share");

		for (var i = 0; i < share_buttons.length; i++) {

		    share_buttons[i].addEventListener('click', function() {

		    	self[this.getAttribute('data-network')]()

		    }, false);

		}

	}


}