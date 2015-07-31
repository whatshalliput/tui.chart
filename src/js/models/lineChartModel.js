/**
 * @fileoverview This model is line chart model for management of line chart data.
 * @author NHN Ent.
 *         FE Development Team <dl_javascript@nhnent.com>
 */

'use strict';

var AxisChartModel = require('./axisChartModel.js');

var LineChartModel = ne.util.defineClass(AxisChartModel, /** @lends LineChartModel.prototype */ {
    /**
     * This model is line chart model for management of line chart data.
     * @constructs LineChartModel
     * @extends AxisChartModel
     * @param {object} data user chart data
     * @param {object} options chart options
     */
    init: function(data, options) {
        options = options || {};

        /**
         * Is vertical chart?
         * @type {boolean}
         */
        this.isVertical = true;

        if (!options.tooltip) {
            options.tooltip = {};
        }
        options.tooltip.addPosition = {
            top: -3
        };
        AxisChartModel.call(this, data, options);
    },

    /**
     * Set series
     * @param {array.<array.<number>>} values chart values
     * @param {array.<array.<string>>} formatValues formatting values
     * @param {{min: number, max: number}} scale axis scale
     * @param {boolean} isVertical is vertical
     * @param {object} options options
     * @private
     */
    _setSeries: function(values, formatValues, scale, isVertical, options) {
        values = this.arrayPivot(values);
        formatValues = this.arrayPivot(formatValues);
        AxisChartModel.prototype._setSeries.call(this, values, formatValues, scale, isVertical, options);
    }
});

module.exports = LineChartModel;