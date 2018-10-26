import template from '../../templates/voxpop.html'
import { $, $$, round, numberWithCommas, wait, getDimensions } from '../modules/util'
import Ractive from 'ractive'
import * as d3 from 'd3'
Ractive.DEBUG = false;

export class Voxbox {

	constructor(data,settings) {

		var self = this


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
            el: '#app',
            data: {"responses":self.responses,"settings":self.settings},
            template: template
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

}