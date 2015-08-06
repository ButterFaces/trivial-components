/*
 Trivial Components (https://github.com/trivial-components/trivial-components)

 Copyright 2015 Yann Massard (https://github.com/yamass) and other contributors

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
(function (factory) {
        "use strict";

        if (typeof define === 'function' && define.amd) {
            // Define as an AMD module if possible
            define('trivial-listbox', ['trivial-core', 'jquery', 'mustache'], factory);
        } else if (typeof exports === 'object') {
            // Node/CommonJS
            module.exports = factory(require('trivial-core'), require('jquery'), require('mustache'));
        } else if (jQuery && !jQuery.fn.triviallistbox) {
            // Define using browser globals otherwise
            // Prevent multiple instantiations if the script is loaded twice
            factory(TrivialComponents, jQuery, Mustache);
        }
    }(function (TrivialComponents, $, Mustache) {

        function TrivialListBox($container, options) {
            options = options || {};
            var config = $.extend({
                valueProperty: null,
                inputTextProperty: 'displayValue',
                template: TrivialComponents.image2LinesTemplate,
                spinnerTemplate: TrivialComponents.defaultSpinnerTemplate,
                entries: null,
                selectedEntry: undefined,
                queryFunction: null, // defined below...
                matchingOptions: {
                    matchingMode: 'contains',
                    ignoreCase: true,
                    maxLevenshteinDistance: 2
                }
            }, options);

            var entries = config.entries;
            var selectedEntry = null;
            var highlightedEntry = null;

            var $listBox = $('<div class="tr-listbox"/>').appendTo($container);
            var $entryList = $('<div class="tr-listbox-entry-list"></div>').appendTo($listBox);

            if (entries) { // if config.entries was set...
                updateEntryElements(entries);
            }

            selectEntry(config.selectedEntry || null);

            function updateEntryElements(entries) {
                $entryList.empty();
                if (entries.length > 0) {
                    for (var i = 0; i < entries.length; i++) {
                        var entry = entries[i];
                        var html = Mustache.render(config.template, entry);
                        var $entry = $(html).addClass("tr-listbox-entry filterable-item").appendTo($entryList);
                        entry._trEntryElement = $entry;
                        (function (entry) {
                            $entry.mousedown(function (e) {
                                $listBox.trigger("mousedown", e);
                                selectEntry(entry);
                            }).mouseup(function (e) {
                                $listBox.trigger("mouseup", e);
                            }).mouseout(function (e) {
                                $listBox.trigger("mouseout", e);
                            }).mouseover(function () {
                                setHighlightedEntry(entry);
                            });
                        })(entry);
                    }
                } else {
                    $entryList.append(config.noEntriesTemplate);
                }
            }

            function updateEntries(newEntries, highlightDirection) {
                highlightedEntry = null;
                entries = newEntries;
                updateEntryElements(entries);

                if (entries.length > 0) {
                    highlightTextMatches();

                    if (typeof highlightDirection != 'undefined') {
                        highlightNextEntry(highlightDirection);
                    }
                } else {
                    setHighlightedEntry(null);
                }
            }

            function minimallyScrollTo($entryWrapper) {
                $listBox.parent().minimallyScrollTo($entryWrapper);
            }

            function setHighlightedEntry(entry) {
                highlightedEntry = entry;
                $entryList.find('.tr-listbox-entry').removeClass('tr-highlighted-entry');
                if (entry != null) {
                    entry._trEntryElement.addClass('tr-highlighted-entry');
                    minimallyScrollTo(entry._trEntryElement);
                }
            }

            function fireChangeEvents() {
                $listBox.trigger("change");
            }

            function selectEntry(entry) {
                selectedEntry = entry;
                $entryList.find(".tr-selected-entry").removeClass("tr-selected-entry");
                if (entry != null) {
                    selectedEntry._trEntryElement.addClass("tr-selected-entry");
                }
                fireChangeEvents();
            }

            function highlightNextEntry(direction) {
                var newHighlightedEntry = getNextHighlightableEntry(direction);
                if (newHighlightedEntry != null) {
                    setHighlightedEntry(newHighlightedEntry);
                }
            }

            function getNextHighlightableEntry(direction) {
                var newHighlightedElementIndex;
                if (entries == null || entries.length == 0) {
                    return null;
                } else if (highlightedEntry == null && direction > 0) {
                    newHighlightedElementIndex = -1 + direction;
                } else if (highlightedEntry == null && direction < 0) {
                    newHighlightedElementIndex = entries.length + direction;
                } else {
                    var currentHighlightedElementIndex = entries.indexOf(highlightedEntry);
                    newHighlightedElementIndex = (currentHighlightedElementIndex + entries.length + direction) % entries.length;
                }
                return entries[newHighlightedElementIndex];
            }

            function highlightTextMatches(searchString) {
                for (var i = 0; i < entries.length; i++) {
                    var $entryElement = entries[i]._trEntryElement;
                    $entryElement.trivialHighlight(searchString, config.matchingOptions);
                }
            }

            this.$ = $listBox;
            $listBox[0].trivialListBox = this;

            this.updateEntries = updateEntries;
            this.getSelectedEntry = function () {
                if (selectedEntry) {
                    var selectedEntryToReturn = jQuery.extend({}, selectedEntry);
                    selectedEntryToReturn._trEntryElement = undefined;
                    return selectedEntryToReturn;
                } else {
                    return null;
                }
            };
            this.selectEntry = selectEntry;
            this.highlightNextEntry = highlightNextEntry;
            this.highlightNextMatchingEntry = function (direction) {
                var nextMatchingEntry = getNextHighlightableEntry(direction);
                if (nextMatchingEntry != null) {
                    setHighlightedEntry(nextMatchingEntry);
                }
            };
            this.getHighlightedEntry = function () {
                return highlightedEntry
            };
            this.highlightTextMatches = highlightTextMatches;
        }

        TrivialComponents.registerJqueryPlugin(TrivialListBox, "TrivialListBox", "tr-listbox");

        return $.fn.TrivialListBox;
    })
);
