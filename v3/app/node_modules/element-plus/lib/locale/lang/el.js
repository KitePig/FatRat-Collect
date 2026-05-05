Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });

//#region ../../packages/locale/lang/el.ts
var el_default = {
	name: "el",
	el: {
		breadcrumb: { label: "Breadcrumb" },
		colorpicker: {
			confirm: "Εντάξει",
			clear: "Καθαρισμός",
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
			now: "Τώρα",
			today: "Σήμερα",
			cancel: "Ακύρωση",
			clear: "Καθαρισμός",
			confirm: "Εντάξει",
			dateTablePrompt: "Use the arrow keys and enter to select the day of the month",
			monthTablePrompt: "Use the arrow keys and enter to select the month",
			yearTablePrompt: "Use the arrow keys and enter to select the year",
			selectedDate: "Selected date",
			selectDate: "Επιλέξτε ημέρα",
			selectTime: "Επιλέξτε ώρα",
			startDate: "Ημερομηνία Έναρξης",
			startTime: "Ωρα Έναρξης",
			endDate: "Ημερομηνία Λήξης",
			endTime: "Ωρα Λήξης",
			prevYear: "Προηγούμενο Έτος",
			nextYear: "Επόμενο Έτος",
			prevMonth: "Προηγούμενος Μήνας",
			nextMonth: "Επόμενος Μήνας",
			year: "Έτος",
			month1: "Ιανουάριος",
			month2: "Φεβρουάριος",
			month3: "Μάρτιος",
			month4: "Απρίλιος",
			month5: "Μάιος",
			month6: "Ιούνιος",
			month7: "Ιούλιος",
			month8: "Αύγουστος",
			month9: "Σεπτέμβριος",
			month10: "Οκτώβριος",
			month11: "Νοέμβριος",
			month12: "Δεκέμβριος",
			weeks: {
				sun: "Κυρ",
				mon: "Δευ",
				tue: "Τρι",
				wed: "Τετ",
				thu: "Πεμ",
				fri: "Παρ",
				sat: "Σαβ"
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
				jan: "Ιαν",
				feb: "Φεβ",
				mar: "Μαρ",
				apr: "Απρ",
				may: "Μαϊ",
				jun: "Ιουν",
				jul: "Ιουλ",
				aug: "Αυγ",
				sep: "Σεπ",
				oct: "Οκτ",
				nov: "Νοε",
				dec: "Δεκ"
			}
		},
		inputNumber: {
			decrease: "decrease number",
			increase: "increase number"
		},
		select: {
			loading: "Φόρτωση",
			noMatch: "Δεν βρέθηκαν αποτελέσματα",
			noData: "Χωρίς δεδομένα",
			placeholder: "Επιλογή"
		},
		mention: { loading: "Φόρτωση" },
		dropdown: { toggleDropdown: "Toggle Dropdown" },
		cascader: {
			noMatch: "Δεν βρέθηκαν αποτελέσματα",
			loading: "Φόρτωση",
			placeholder: "Επιλογή",
			noData: "Χωρίς δεδομένα"
		},
		pagination: {
			goto: "Μετάβαση σε",
			pagesize: "/σελίδα",
			total: "Σύνολο {total}",
			pageClassifier: "",
			page: "Page",
			prev: "Go to previous page",
			next: "Go to next page",
			currentPage: "page {pager}",
			prevPages: "Previous {pager} pages",
			nextPages: "Next {pager} pages",
			deprecationWarning: "Deprecated usages detected, please refer to the el-pagination documentation for more details"
		},
		dialog: { close: "Close this dialog" },
		drawer: { close: "Close this dialog" },
		messagebox: {
			title: "Μήνυμα",
			confirm: "Εντάξει",
			cancel: "Ακύρωση",
			error: "Άκυρη εισαγωγή",
			close: "Close this dialog"
		},
		upload: {
			deleteTip: "Πάτησε Διαγραφή για αφαίρεση",
			delete: "Διαγραφή",
			preview: "Προεπισκόπηση",
			continue: "Συνέχεια"
		},
		slider: {
			defaultLabel: "slider between {min} and {max}",
			defaultRangeStartLabel: "pick start value",
			defaultRangeEndLabel: "pick end value"
		},
		table: {
			emptyText: "Χωρίς Δεδομένα",
			confirmFilter: "Επιβεβαίωση",
			resetFilter: "Επαναφορά",
			clearFilter: "Όλα",
			sumText: "Σύνολο",
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
		tree: { emptyText: "Χωρίς Δεδομένα" },
		transfer: {
			noMatch: "Δεν βρέθηκαν αποτελέσματα",
			noData: "Χωρίς δεδομένα",
			titles: ["Λίστα 1", "Λίστα 2"],
			filterPlaceholder: "Αναζήτηση",
			noCheckedFormat: "{total} Αντικείμενα",
			hasCheckedFormat: "{checked}/{total} επιλεγμένα"
		},
		image: { error: "FAILED" },
		pageHeader: { title: "Back" },
		popconfirm: {
			confirmButtonText: "Yes",
			cancelButtonText: "No"
		},
		carousel: {
			leftArrow: "Carousel arrow left",
			rightArrow: "Carousel arrow right",
			indicator: "Carousel switch to index {index}"
		}
	}
};

//#endregion
exports.default = el_default;
//# sourceMappingURL=el.js.map