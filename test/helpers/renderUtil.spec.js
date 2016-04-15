/**
 * @fileoverview test render util
 * @author NHN Ent.
 *         FE Development Team <dl_javascript@nhnent.com>
 */

'use strict';

var renderUtil = require('../../src/js/helpers/renderUtil.js'),
    dom = require('../../src/js/helpers/domHandler.js');

describe('renderUtil', function() {
    describe('concatStr()', function() {
        it('문자들을 인자로 전달하면 붙여진 결과를 반환합니다. ex) concatStr("a", "b", "c") ---> "abc"', function() {
            var result = renderUtil.concatStr();
            expect(result).toBe('');

            result = renderUtil.concatStr('a', 'b', 'c');
            expect(result).toBe('abc');
        });
    });

    describe('makeFontCssText()', function() {
        it('객체로 전달받은 css 속성들을 cssText 문자열로 변환하여 반환합니다.', function() {
            var result = renderUtil.makeFontCssText({
                fontSize: 12,
                fontFamily: 'Verdana',
                color: 'blue'
            });

            expect(result).toBe('font-size:12px;font-family:Verdana;color:blue');
        });
    });

    describe('_createSizeCheckEl()', function() {
        it('동적인 폰트 크기를 체크할 수 있는 HTML Element를 반환합니다.', function() {
            var actual = renderUtil._createSizeCheckEl();

            expect(actual.className).toBe('tui-chart-size-check-element');
            expect(actual.firstChild.nodeName).toBe('SPAN');
        });
    });

    describe('_getRenderedLabelsMaxSize()', function() {
        it('인자로 전달하는 레이블들을 전달한 함수로 실행하여 가장 큰 값을 반환합니다.', function() {
            var actual = renderUtil._getRenderedLabelsMaxSize(['label1', 'label12'], {}, function(label) {
                return label.length;
            });
            expect(actual).toBe(7);
        });
    });

    describe('renderDimension()', function() {
        it('전달 받은 Element css에 전달 받은 너비, 높이 값을 설정합니다.', function() {
            var el = dom.create('DIV'),
                size = {width: 500, height: 300};
            renderUtil.renderDimension(el, size);
            expect(el.style.width).toBe('500px');
            expect(el.style.height).toBe('300px');
        });
    });

    describe('renderPosition()', function() {
        it('전달 받은 Element style에 전달 받은 위치(top, left)값을 설정합니다.', function() {
            var el = dom.create('DIV'),
                position = {top: 50, left: 50};
            renderUtil.renderPosition(el, position);
            expect(el.style.top).toBe('50px');
            expect(el.style.left).toBe('50px');
        });
    });

    describe('renderBackground()', function() {
        it('전달 받은 Element style에 전달 받은 배경 정보를 설정합니다.', function() {
            var el = dom.create('DIV');
            renderUtil.renderBackground(el, 'red');
            expect(el.style.backgroundColor).toBe('red');
        });
    });

    describe('renderTitle()', function() {
        it('전달된 title, 테마, className 정보로 타이틀 영역 설정한 후 생성된 HTML Element을 반환합니다.', function() {
            var elTitle = renderUtil.renderTitle('Test title', {fontSize: 12, background: 'orange'}, 'test-title');
            expect(elTitle.innerHTML).toBe('Test title');
            expect(elTitle.style.fontSize).toBe('12px');
            expect(elTitle.style.backgroundColor).toBe('orange');
            expect(elTitle.className).toBe('test-title');
        });
    });

    describe('makeCustomEventName()', function() {
        it('커스텀 이벤트명을 생성합니다.', function() {
            var actual = renderUtil.makeCustomEventName('prefix', 'value', 'suffix'),
                expected = 'prefixValueSuffix';
            expect(actual).toBe(expected);
        });
    });

    describe('formatValue()', function() {
        it('두번째인자인 포맷함수를 이용하여 첫번째 인자인 값을 포맷팅합니다.', function() {
            var formatFunctions = [function(value) {
                    return '00' + value;
                }],
                actual = renderUtil.formatValue(3, formatFunctions),
                expected = '003';
            expect(actual).toEqual(expected);
        });
    });

    describe('formatValues()', function() {
        it('전달된 value를 formatFunctions 함수들로 포맷팅하여 반환합니다.', function() {
            var formatFunctions = [
                    function(value) {
                        return '00' + value;
                    }, function(value) {
                        return value + '%'
                    }
                ],
                actual = renderUtil.formatValues([10, 20, 30, 40], formatFunctions),
                expected = ['0010%', '0020%', '0030%', '0040%'];

            expect(actual).toEqual(expected);
        });
    });
});