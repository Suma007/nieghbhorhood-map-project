
var model = function (){
	location= [
		{
			lat: 8.5583,
			lng: 76.8812,
			title: 'Technopark'
		},
		{
			lat: 8.4004,
			lng: 76.9787,
			title: 'Kovalam'
		},
		{
			lat: 8.4784498,
			lng: 76.911906,
			title:'Shanghumugam'
		},
		{
			lat: 8.5028,
			lng: 76.9513,
			title: 'Palayam'
		},
		{
			lat: 8.4909,
			lng: 76.9527,
			title: 'Thampanoor'
		},
		{
			lat: 8.5086,
			lng: 76.9657,
			title: 'Vellayambalam'
		}],
	loc= ['Technopark','Palayam','Thampanoor','Vellayambalam','Kovalam','Shanghumugam']
};
var viewModel = function() {
	var self = this;
	var marker=ko.oberservableArray([]);
	var locations=ko.oberservableArray([]);
	var mo= model();
	locations.push(mo.location);
	

}
ko.applyBindings(new model());