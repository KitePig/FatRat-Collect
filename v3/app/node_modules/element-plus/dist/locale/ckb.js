/*! Element Plus v2.13.7 */

(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports =  factory() :
  typeof define === 'function' && define.amd ? define([], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.ElementPlusLocaleCkb = factory()));
})(this, function() {

//#region ../../packages/locale/lang/ckb.ts
	var ckb_default = {
		name: "ckb",
		el: {
			breadcrumb: { label: "Breadcrumb" },
			colorpicker: {
				confirm: "باشە",
				clear: "پاککردنەوە",
				defaultLabel: "هەڵبژاردنی ڕەنگ",
				description: "ڕەنگی ئێستا {color}. ئینتەر دابگرە بۆ هەڵبژاردنی ڕەنگی نوێ.",
				alphaLabel: "pick alpha value",
				alphaDescription: "alpha {alpha}, current color is {color}",
				hueLabel: "pick hue value",
				hueDescription: "hue {hue}, current color is {color}",
				svLabel: "pick saturation and brightness value",
				svDescription: "saturation {saturation}, brightness {brightness}, current color is {color}",
				predefineDescription: "select {value} as the color"
			},
			datepicker: {
				now: "ئێستا",
				today: "ئەمڕۆ",
				cancel: "پەشیمانبوونەوە",
				clear: "پاککردنەوە",
				confirm: "باشە",
				dateTablePrompt: "کلیلی ئاراستەکان بەکاربهێنەر بۆ هەڵبژاردنی ڕۆژی مانگەکە",
				monthTablePrompt: "کلیلی ئاراستەکان بەکاربهێنەر بۆ هەڵبژاردنی مانگ",
				yearTablePrompt: "کلیلی ئاراستەکان بەکاربهێنەر بۆ هەڵبژاردنی ساڵ",
				selectedDate: "بەرواری هەڵبژێردراو",
				selectDate: "هەڵبژاردنی بەروار",
				selectTime: "هەڵبژاردنی کات",
				startDate: "بەرواری دەستپێک",
				startTime: "کاتی دەستپێک",
				endDate: "بەرواری کۆتایی",
				endTime: "کاتی کۆتایی",
				prevYear: "ساڵی پێشوو",
				nextYear: "ساڵ داهاتوو",
				prevMonth: "مانگی پێشوو",
				nextMonth: "مانگی داهاتوو",
				year: "",
				month1: "ڕێبەندان",
				month2: "ڕەشەمە",
				month3: "نەورۆز",
				month4: "گوڵان",
				month5: "جۆزەردان",
				month6: "پووشپەڕ",
				month7: "گەلاوێژ",
				month8: "خەرمانان",
				month9: "ڕەزبەر",
				month10: "گەڵاڕێزان",
				month11: "سەرماوەز",
				month12: "بەفرانبار",
				weeks: {
					sun: "یەکشەممە",
					mon: "دووشەممە",
					tue: "سێشەممە",
					wed: "چوارشەممە",
					thu: "پێنجشەممە",
					fri: "هەینی",
					sat: "شەممە"
				},
				weeksFull: {
					sun: "یەکشەممە",
					mon: "دووشەممە",
					tue: "سێشەممە",
					wed: "چوارشەممە",
					thu: "پێنجشەممە",
					fri: "هەینی",
					sat: "شەممە"
				},
				months: {
					jan: "ڕێبەندان",
					feb: "ڕەشەمە",
					mar: "نەورۆز",
					apr: "گوڵان",
					may: "جۆزەردان",
					jun: "پووشپەڕ",
					jul: "گەلاوێژ",
					aug: "خەرمانان",
					sep: "ڕەزبەر",
					oct: "گەڵاڕێزان",
					nov: "سەرماوەز",
					dec: "بەفرانبار"
				}
			},
			inputNumber: {
				decrease: "کەمکردنەوەی ژمارە",
				increase: "زیادکردنی ژمارە"
			},
			select: {
				loading: "بارکردن",
				noMatch: "هیچ داتایەکی هاوتا نیە",
				noData: "هیچ داتایەک نیە",
				placeholder: "هەڵبژاردن"
			},
			mention: { loading: "بارکردن" },
			dropdown: { toggleDropdown: "کردنەوەو داخستنی کشاو" },
			cascader: {
				noMatch: "هیچ داتایەکی هاوتا نیە",
				loading: "بارکردن",
				placeholder: "هەڵبژاردن",
				noData: "هیچ داتایەک نیە"
			},
			pagination: {
				goto: "بڕۆ بۆ",
				pagesize: "/لاپەڕە",
				total: "کۆی گشتیی {total}",
				pageClassifier: "",
				page: "Page",
				prev: "Go to previous page",
				next: "Go to next page",
				currentPage: "page {pager}",
				prevPages: "Previous {pager} pages",
				nextPages: "Next {pager} pages",
				deprecationWarning: "بەکارهێنانی بەکارنەهێنراو دۆزراوەتەوە، تکایە بۆ وردەکاری زیاتر سەردانی بەڵگەنامەکانی el-pagination بکە"
			},
			dialog: { close: "داخستنی ئەم دیالۆگە" },
			drawer: { close: "داخستنی ئەم دیالۆگە" },
			messagebox: {
				title: "پەیام",
				confirm: "باشە",
				cancel: "پەشایمانبوونەوە",
				error: "داخلکردنی نایاسایی",
				close: "داخستنی ئەم دیالۆگە"
			},
			upload: {
				deleteTip: "فشار لەسەر سڕینەوە بکە بۆ لابردن",
				delete: "سڕینەوە",
				preview: "بینینەوە",
				continue: "بەردەوامبوون"
			},
			slider: {
				defaultLabel: "سلاید لە نێوان {min} و {max}",
				defaultRangeStartLabel: "بەهای دەستپێک هەلبژێرە",
				defaultRangeEndLabel: "بەهای کۆتایی هەلبژێرە"
			},
			table: {
				emptyText: "هیچ داتا نیە",
				confirmFilter: "دووپاتکردنەوە",
				resetFilter: "جێگیرکردنەوە",
				clearFilter: "هەموو",
				sumText: "کۆ",
				selectAllLabel: "Select all rows",
				selectRowLabel: "Select this row",
				expandRowLabel: "Expand this row",
				collapseRowLabel: "Collapse this row",
				sortLabel: "Sort by {column}",
				filterLabel: "Filter by {column}"
			},
			tag: { close: "Close this tag" },
			tour: {
				next: "Next",
				previous: "Previous",
				finish: "Finish",
				close: "Close this dialog"
			},
			tree: { emptyText: "هیچ داتا نیە" },
			transfer: {
				noMatch: "هیچ داتای هاوتا نیە",
				noData: "هیچ داتا نیە",
				titles: ["لیستی 1", "لیستی 2"],
				filterPlaceholder: "کلیلەوشە داخڵ بکە",
				noCheckedFormat: "{total} دانە",
				hasCheckedFormat: "{checked}/{total} هەڵبژێردراوە"
			},
			image: { error: "شکستی هێنا" },
			pageHeader: { title: "گەڕانەوە" },
			popconfirm: {
				confirmButtonText: "بەڵێ",
				cancelButtonText: "نەخێر"
			},
			carousel: {
				leftArrow: "Carousel arrow left",
				rightArrow: "Carousel arrow right",
				indicator: "Carousel switch to index {index}"
			}
		}
	};

//#endregion
return ckb_default;
});