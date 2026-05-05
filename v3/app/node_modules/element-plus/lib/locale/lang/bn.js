Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });

//#region ../../packages/locale/lang/bn.ts
var bn_default = {
	name: "bn",
	el: {
		breadcrumb: { label: "Breadcrumb" },
		colorpicker: {
			confirm: "ঠিক আছে",
			clear: "ক্লিয়ার",
			defaultLabel: "color picker",
			description: "current color is {color}. press enter to select a new color.",
			alphaLabel: "pick alpha value",
			alphaDescription: "alpha {alpha}, current color is {color}",
			hueLabel: "pick hue value",
			hueDescription: "hue {hue}, current color is {color}",
			svLabel: "pick saturation and brightness value",
			svDescription: "saturation {saturation}, brightness {brightness}, current color is {color}",
			predefineDescription: "select {value} as the color"
		},
		datepicker: {
			now: "এখন",
			today: "আজ",
			cancel: "বাতিল",
			clear: "ক্লিয়ার",
			confirm: "ঠিক আছে",
			dateTablePrompt: "Use the arrow keys and enter to select the day of the month",
			monthTablePrompt: "Use the arrow keys and enter to select the month",
			yearTablePrompt: "Use the arrow keys and enter to select the year",
			selectedDate: "Selected date",
			selectDate: "তারিখ নির্বাচন করুন",
			selectTime: "সময় নির্বাচন করুন",
			startDate: "যে তারিখ থেকে",
			startTime: "যে সময় থেকে",
			endDate: "যে তারিখ পর্যন্ত",
			endTime: "যে সময় পর্যন্ত",
			prevYear: "পূর্ববর্তী বছর",
			nextYear: "পরবর্তী বছর",
			prevMonth: "পূর্ববর্তী মাস",
			nextMonth: "পরবর্তী মাস",
			year: "সাল",
			month1: "জানুয়ারি",
			month2: "ফেব্রুয়ারী",
			month3: "মার্চ",
			month4: "এপ্রিল",
			month5: "মে",
			month6: "জুন",
			month7: "জুলাই",
			month8: "আগষ্ট",
			month9: "সেপ্টেম্বর",
			month10: "অক্টোবর",
			month11: "নভেম্বর",
			month12: "ডিসেম্বর",
			weeks: {
				sun: "রবি",
				mon: "সোম",
				tue: "মঙ্গল",
				wed: "বুধ",
				thu: "বৃহঃ",
				fri: "শুক্র",
				sat: "শনি"
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
				jan: "জানু",
				feb: "ফেব্রু",
				mar: "মার্চ",
				apr: "এপ্রি",
				may: "মে",
				jun: "জুন",
				jul: "জুলা",
				aug: "আগ",
				sep: "সেপ্টে",
				oct: "আক্টো",
				nov: "নভে",
				dec: "ডিসে"
			}
		},
		inputNumber: {
			decrease: "decrease number",
			increase: "increase number"
		},
		select: {
			loading: "লোড হচ্ছে",
			noMatch: "কোন মিল পওয়া যায়নি",
			noData: "কোন ডাটা নেই",
			placeholder: "নির্বাচন করুন"
		},
		mention: { loading: "লোড হচ্ছে" },
		dropdown: { toggleDropdown: "Toggle Dropdown" },
		cascader: {
			noMatch: "কোন মিল পওয়া যায়নি",
			loading: "লোড হচ্ছে",
			placeholder: "নির্বাচন করুন",
			noData: "কোন ডাটা নেই"
		},
		pagination: {
			goto: "যান",
			pagesize: "/পেজ",
			total: "মোট {total}",
			pageClassifier: "",
			page: "Page",
			prev: "Go to previous page",
			next: "Go to next page",
			currentPage: "page {pager}",
			prevPages: "Previous {pager} pages",
			nextPages: "Next {pager} pages",
			deprecationWarning: "অপ্রচলিত (Deprecated) ব্যাবহার পওয়া গেছে, আরও জানতে চাইলে, দয়া করে el-pagination এর ডকুমেন্টেশন দেখুন"
		},
		dialog: { close: "Close this dialog" },
		drawer: { close: "Close this dialog" },
		messagebox: {
			title: "বার্তা",
			confirm: "ঠিক আছে",
			cancel: "বাতিল",
			error: "ইনপুট ডাটা গ্রহনযোগ্য নয়",
			close: "Close this dialog"
		},
		upload: {
			deleteTip: "অপসারণ করতে \"ডিলিট\" এ ক্লিক করুন",
			delete: "ডিলিট",
			preview: "প্রিভিউ",
			continue: "চালিয়ে যান"
		},
		slider: {
			defaultLabel: "slider between {min} and {max}",
			defaultRangeStartLabel: "pick start value",
			defaultRangeEndLabel: "pick end value"
		},
		table: {
			emptyText: "কোন ডাটা নেই",
			confirmFilter: "নিশ্চিত করুন",
			resetFilter: "রিসেট",
			clearFilter: "সব",
			sumText: "সারাংশ",
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
		tree: { emptyText: "কোন ডাটা নেই" },
		transfer: {
			noMatch: "কোন মিল পওয়া যায়নি",
			noData: "কোন ডাটা নেই",
			titles: ["লিস্ট ১", "লিস্ট ২"],
			filterPlaceholder: "সার্চ করুন",
			noCheckedFormat: "{total} আইটেম",
			hasCheckedFormat: "{checked}/{total} টিক করা হয়েছে"
		},
		image: { error: "ব্যর্থ হয়েছে" },
		pageHeader: { title: "পিছনে" },
		popconfirm: {
			confirmButtonText: "হ্যা",
			cancelButtonText: "না"
		},
		carousel: {
			leftArrow: "Carousel arrow left",
			rightArrow: "Carousel arrow right",
			indicator: "Carousel switch to index {index}"
		}
	}
};

//#endregion
exports.default = bn_default;
//# sourceMappingURL=bn.js.map