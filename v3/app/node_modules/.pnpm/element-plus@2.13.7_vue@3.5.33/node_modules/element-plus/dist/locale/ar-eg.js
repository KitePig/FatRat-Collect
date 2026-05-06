/*! Element Plus v2.13.7 */

(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports =  factory() :
  typeof define === 'function' && define.amd ? define([], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.ElementPlusLocaleArEg = factory()));
})(this, function() {

//#region ../../packages/locale/lang/ar-eg.ts
	var ar_eg_default = {
		name: "ar-eg",
		el: {
			breadcrumb: { label: "Breadcrumb" },
			colorpicker: {
				confirm: "موافق",
				clear: "إزالة",
				defaultLabel: "إختر اللون",
				description: "اللون الحالي هو {color}. اضفط انتر لاختيار لون جديد",
				alphaLabel: "pick alpha value",
				alphaDescription: "alpha {alpha}, current color is {color}",
				hueLabel: "pick hue value",
				hueDescription: "hue {hue}, current color is {color}",
				svLabel: "pick saturation and brightness value",
				svDescription: "saturation {saturation}, brightness {brightness}, current color is {color}",
				predefineDescription: "select {value} as the color"
			},
			datepicker: {
				now: "الآن",
				today: "اليوم",
				cancel: "إلغاء",
				clear: "إزالة",
				confirm: "موافق",
				dateTablePrompt: "استخدم مفاتيح الاسهم و اضغط انتر لاختيار اليوم المراد من الشهر",
				monthTablePrompt: "استخدم مفاتيح الاسهم واضغط انتر لاختيار الشهر",
				yearTablePrompt: "استخدم مفاتيح الاسهم واضغط انتر لاختيار السنة",
				selectedDate: "Selected date",
				selectDate: "إختر التاريخ",
				selectTime: "إختر الوقت",
				startDate: "تاريخ البدء",
				startTime: "وقت البدء",
				endDate: "تاريخ الإنتهاء",
				endTime: "وقت الإنتهاء",
				prevYear: "السنة السابقة",
				nextYear: "السنة التالية",
				prevMonth: "الشهر السابق",
				nextMonth: "الشهر التالي",
				year: "سنة",
				month1: "يناير",
				month2: "فبراير",
				month3: "مارس",
				month4: "أبريل",
				month5: "مايو",
				month6: "يونيو",
				month7: "يوليو",
				month8: "أغسطس",
				month9: "سبتمبر",
				month10: "أكتوبر",
				month11: "نوفمبر",
				month12: "ديسمبر",
				weeks: {
					sun: "الأحد",
					mon: "الأثنين",
					tue: "الثلاثاء",
					wed: "الأربعاء",
					thu: "الخميس",
					fri: "الجمعة",
					sat: "السبت"
				},
				weeksFull: {
					sun: "Sunday",
					mon: "Monday",
					tue: "Tuesday",
					wed: "Wednesday",
					thu: "Thursday",
					fri: "Friday",
					sat: "Saturday"
				},
				months: {
					jan: "يناير",
					feb: "فبراير",
					mar: "مارس",
					apr: "أبريل",
					may: "مايو",
					jun: "يونيو",
					jul: "يوليو",
					aug: "أغسطس",
					sep: "سبتمبر",
					oct: "أكتوبر",
					nov: "نوفمبر",
					dec: "ديسمبر"
				}
			},
			inputNumber: {
				decrease: "طرح رقم",
				increase: "زيادة رقم"
			},
			select: {
				loading: "جار التحميل",
				noMatch: "لايوجد بيانات مطابقة",
				noData: "لايوجد بيانات",
				placeholder: "إختر"
			},
			mention: { loading: "جار التحميل" },
			dropdown: { toggleDropdown: "تبديل القائمة" },
			cascader: {
				noMatch: "لايوجد بيانات مطابقة",
				loading: "جار التحميل",
				placeholder: "إختر",
				noData: "لايوجد بيانات"
			},
			pagination: {
				goto: "أذهب إلى",
				pagesize: "/صفحة",
				total: "الكل {total}",
				pageClassifier: "",
				page: "صفحة",
				prev: "انتقل إلى الصفحة السابقة",
				next: "انتقل إلى الصفحة التالية",
				currentPage: "صفحة رقم {pager}",
				prevPages: "صفحات {pager} السابقة",
				nextPages: "صفحات {pager} التالية",
				deprecationWarning: "Deprecated usages detected, please refer to the el-pagination documentation for more details"
			},
			dialog: { close: "أغلق هذا التبويب" },
			drawer: { close: "أغلق هذا التبويب" },
			messagebox: {
				title: "العنوان",
				confirm: "موافق",
				cancel: "إلغاء",
				error: "مدخل غير صحيح",
				close: "أغلق هذا التبويب"
			},
			upload: {
				deleteTip: "اضغط ازالة لحذف المحتوى",
				delete: "حذف",
				preview: "عرض",
				continue: "إستمرار"
			},
			slider: {
				defaultLabel: "شريط التمرير بين {min} و {max}",
				defaultRangeStartLabel: "اختر قيمة البدء",
				defaultRangeEndLabel: "اختر قيمة النهاية"
			},
			table: {
				emptyText: "لايوجد بيانات",
				confirmFilter: "تأكيد",
				resetFilter: "حذف",
				clearFilter: "الكل",
				sumText: "المجموع",
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
			tree: { emptyText: "لايوجد بيانات" },
			transfer: {
				noMatch: "لايوجد بيانات مطابقة",
				noData: "لايوجد بيانات",
				titles: ["قائمة 1", "قائمة 2"],
				filterPlaceholder: "ادخل كلمة",
				noCheckedFormat: "{total} عناصر",
				hasCheckedFormat: "{checked}/{total} مختار"
			},
			image: { error: "فشل" },
			pageHeader: { title: "عودة" },
			popconfirm: {
				confirmButtonText: "نعم",
				cancelButtonText: "لا"
			},
			carousel: {
				leftArrow: "Carousel arrow left",
				rightArrow: "Carousel arrow right",
				indicator: "Carousel switch to index {index}"
			}
		}
	};

//#endregion
return ar_eg_default;
});