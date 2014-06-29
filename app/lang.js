gApp.config(function ($translateProvider) {
	$translateProvider.translations('en', {
		MENU_LANG: 'Language',
		MENU_NAV: 'Navigation',
		MENU_NOW: 'What\'s now',
		MENU_EPG: 'EPG',
		MENU_TIMERS: 'Timers',
		MENU_RECS: 'Recordings',
		MENU_CHAGROUP: 'Channel group',
		MENU_CHAGROUPS: 'Channel groups',
		MENU_ABOUT: 'About',
		ERROR_NO_CHANNEL_HEAD: 'No channel selected!',
		ERROR_NO_CHANNEL_MSG: 'Select a channel in the list to the left to show the Electronic Program Guide (EPG).',
		CMD_UPDATE: 'Update',
		CMD_RECORD: 'Record',
		CMD_CLOSE: 'Close',
		CMD_TIMER_ADD: 'Add timer',
		CMD_TIMER_DELETE: 'Delete timer',
		ASK_TIMER_DELETE: 'Do you want to delete timer "{0}"?',
		CMD_RECORDING_DELETE: 'Delete recording',
		ASK_RECORDING_DELETE: 'Do you want to delete recording "{0}"?',
		YES: 'Yes',
		NO: 'No',
		WEEKDAY: 'Weekday',
		WEEKDAY_0: 'Monday',
		WEEKDAY_1: 'Tuesday',
		WEEKDAY_2: 'Wednesday',
		WEEKDAY_3: 'Thursday',
		WEEKDAY_4: 'Friday',
		WEEKDAY_5: 'Saturday',
		WEEKDAY_6: 'Sunday',
		CHANNEL: 'Channel',
		TIME: 'Time',
		TITLE: 'Title',
		DAY: 'Day',
		START: 'Start',
		END: 'End',
		CONNECTION_ERROR: 'Could not connect to VDR',
		CHANNELS_LOADED: 'Loaded {0} channels',
		EVENTS_LOADED: 'Loaded {0} events',
		TIMER_ADDED: 'Timer {0} added',
		TIMER_DELETED: 'Timer {0} deleted',
		RECORDINGS_LOADED: 'Loaded {0} recordings',
		RECORDING_DELETED: 'Timer {0} deleted'
	});

	$translateProvider.translations('de', {
		MENU_LANG: 'Sprache',
		MENU_NAV: 'Navigation',
		MENU_NOW: 'Jetzt im TV',
		MENU_EPG: 'Programm',
		MENU_TIMERS: 'Timer',
		MENU_RECS: 'Aufnahmen',
		MENU_CHAGROUP: 'Sendergruppe',
		MENU_CHAGROUPS: 'Sendergruppen',
		MENU_ABOUT: 'Über ...',
		ERROR_NO_CHANNEL_HEAD: 'Kein Sender ausgewählt!',
		ERROR_NO_CHANNEL_MSG: 'Wähle einen Sender aus der Liste um den elektronischen Programmführer (EPG) anzuzeigen.',
		CMD_UPDATE: 'Aktualisieren',
		CMD_RECORD: 'Aufnehmen',
		CMD_CLOSE: 'Schließen',
		CMD_TIMER_ADD: 'Timer hinzufügen',
		CMD_TIMER_DELETE: 'Timer löschen',
		ASK_TIMER_DELETE: 'Soll Timer "{0}" wirklich gelöscht werden?',
		CMD_RECORDING_DELETE: 'Aufnahme löschen',
		ASK_RECORDING_DELETE: 'Soll Aufnahme "{0}" wirklich gelöscht werden?',
		YES: 'Ja',
		NO: 'Nein',
		WEEKDAY: 'Wochentag',
		WEEKDAY_0: 'Montag',
		WEEKDAY_1: 'Dienstag',
		WEEKDAY_2: 'Mittwoch',
		WEEKDAY_3: 'Donnerstag',
		WEEKDAY_4: 'Freitag',
		WEEKDAY_5: 'Sonnabend',
		WEEKDAY_6: 'Sonntag',
		CHANNEL: 'Sender',
		TIME: 'Zeit',
		TITLE: 'Titel',
		DAY: 'Tag',
		START: 'Start',
		END: 'Ende',
		CONNECTION_ERROR: 'Verbindung zu VDR unterbrochen',
		CHANNELS_LOADED: '{0} Sender geladen',
		EVENTS_LOADED: '{0} Sendungen geladen',
		TIMER_ADDED: 'Timer {0} wurde hinzugefügt',
		TIMER_DELETED: 'Timer {0} wurde gelöscht',
		RECORDINGS_LOADED: '{0} Aufnahmen geladen',
		RECORDING_DELETED: 'Aufnahme {0} wurde gelöscht'
	});

	$translateProvider
	.fallbackLanguage('en')
	.registerAvailableLanguageKeys(['en', 'de'], {
		'en_US': 'en',
		'en-US': 'en',
		'en_UK': 'en',
		'en-UK': 'en',
		'de_DE': 'de',
		'de-DE': 'de',
		'de_CH': 'de',
		'de-CH': 'de'
	})
	.determinePreferredLanguage();
});

gApp.translate = function(token) {
	return gApp._translateFilter(token);
};

gApp.translateFormat = function(token) {
	return gApp._formatFilter(gApp._translateFilter(token), Array.prototype.slice.call(arguments, 1));
};
