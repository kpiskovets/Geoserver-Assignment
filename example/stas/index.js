
$(function () {
	"use strict";

	$("#db").resizable({ expandButton: $('#db>.resizer') });

  $( "#tabs" ).tabs();

	loadDBData({ table: 'address', domId: 'tabs-1', class: 'db-row', ref: 'id' }, function (row) {
		return row.region + ', ' + row.district + ',' + row.country+','+row.street;
	});

	loadDBData({ table: 'contacts', domId: 'tabs-2', class: 'db-row', ref: 'id' }, function (row) {
		return row.telephone + '/' + row.email + '/' + row.fax + '/' + row.website;
	});

	/*loadDBData({ table: 'Departments', domId: 'tabs-3', class: 'db-row', ref: 'affiliation' }, function (row) {
		return row.name;
	});*/

	/*loadDBData({ table: 'Faculties', domId: 'tabs-4', class: 'db-row', ref: 'affiliation' }, function (row) {
		return row.name;
	});

	loadDBData({ table: 'Workers', domId: 'tabs-5', class: 'db-row', ref: 'id_schools' }, function (row) {
		return row.name + ', ' + row.status + ' - ' + row.position;
	});*/

	loadDBData({ table: 'schools', domId: 'tabs-6', class: 'db-result-row', ref: 'id' }, function (row) {
		return row.name + ',' + row.president;
	});

	function loadDBData(opts, toStringFunction) {
	  $.get('http://localhost:3001/select?table=' + opts.table)
	  	.done(function (response) { 
		console.log(response);
	  		$('#' + opts.domId).html(response.reduce(function (lastHtml, row) {
	  			return lastHtml + '<div class="' + opts.class + '" data-table="' + opts.table + '" data-id="' + row[opts.ref] + '">' + toStringFunction(row) + '</div>';
	  		}, ''));
	  		setClick();
	  	})
	  	.error(function (err) { console.log(err); });
	}

	function loadDBFilterData(opts, toStringFunction) {
	  $.get('http://localhost:3001/where?table=' + opts.table + '&id=' + opts.recordId)
	  	.done(function (response) {
	  		console.log(response); 
	  		$('#' + opts.domId).html(response.reduce(function (lastHtml, row) {
	  			return lastHtml + '<div class="' + opts.class + '" data-id="' + row.id + '">' + toStringFunction(row) + '</div>';
	  		}, ''));
	  		setClick();
	  		$('[href="#' + opts.domId + '"]').click();
	  	})
	  	.error(function (err) { console.log(err); });
	}

	function setClick() {
		$('.db-row').off('click').on('click', function () {
			var table = $(this).attr('data-table');
			var recordId = $(this).attr('data-id');

			loadDBFilterData({ table: table, recordId: recordId, domId: 'tabs-7', class: 'db-result-row' }, function (row) {
				return row.name + ',' + row.president;
			});
		});

		$('.db-result-row').off('click').on('click', function () {
			var recordId = $(this).attr('data-id');

			console.log(recordId);
			school.mergeNewParams({'CQL_FILTER':"id="+recordId});
			
			
		});
	}
	function updateFilter() {
    
    return false;
}

	
});