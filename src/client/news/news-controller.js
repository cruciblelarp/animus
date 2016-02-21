define([

	'underscore',
	'angular',

	'angular-module'

], function (_, ng, _animus) {
	var COMPONENT_NAME = 'newsCtrl';

	ng.module(_animus).controller(COMPONENT_NAME, [
		'$scope',
		function ($scope) {

			var selectedStory;

			_.extend($scope, {

				toggle: function ($event, story) {
					$event.preventDefault();

					if (!selectedStory) {
						selectedStory = story;
						selectedStory.selected = true;
					} else if (selectedStory === story) {
						selectedStory.selected = false;
						selectedStory = null;
					} else {
						selectedStory.selected = false;
						selectedStory = story;
						selectedStory.selected = true;
					}

				},

				stories: [
					{
						id: 1,
						title: 'News story 1',
						content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur posuere' +
						' tristique hendrerit. Donec sagittis laoreet laoreet. Morbi non magna vel nunc maximus' +
						' mattis. Pellentesque pellentesque est sit amet augue bibendum venenatis. Donec euismod' +
						' nibh vel efficitur feugiat. Aenean pharetra varius est sit amet vestibulum. Vestibulum' +
						' sollicitudin est mauris, vel scelerisque mi posuere at. Fusce rutrum hendrerit suscipit.' +
						' Ut in diam condimentum, pellentesque elit a, dapibus purus. Maecenas diam nisi, eleifend' +
						' id tempor sed, varius ac quam. Suspendisse potenti. Suspendisse scelerisque nisi eros,' +
						' volutpat placerat ex fermentum vel. Phasellus a ipsum quis nisl feugiat tempus. Praesent' +
						' at nisl leo.'
					},
					{
						id: 2,
						title: 'News story 2',
						content: 'Morbi dictum dolor vitae magna laoreet ultrices. Sed sit amet aliquam nunc.' +
						' Vivamus viverra volutpat ultricies. Praesent dictum velit vitae lacinia hendrerit.' +
						' Curabitur id tortor porttitor, auctor lorem eu, cursus sem. Donec laoreet sapien sed' +
						' laoreet euismod. Nulla ut cursus quam. Ut quis dui enim. Morbi nibh sapien, varius ut' +
						' maximus eget, varius ac magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
						' Sed eu placerat turpis, quis venenatis risus. Suspendisse maximus ex nec urna convallis' +
						' blandit. Morbi vestibulum nisl eu lectus cursus, nec hendrerit orci mollis. Fusce porta' +
						' arcu lorem, in aliquam tortor sagittis et. Aliquam vestibulum tempus felis, quis dapibus' +
						' leo posuere non. Nulla sed arcu sed orci ornare convallis.'
					},
					{
						id: 3,
						title: 'News story 3',
						content: 'Maecenas consequat purus id nisi congue placerat. Mauris at pharetra purus.' +
						' Nullam et tortor neque. Aliquam erat volutpat. Fusce porttitor, erat id sodales' +
						' venenatis, eros felis eleifend elit, at porttitor nibh leo eu purus. Aliquam aliquet' +
						' lectus arcu, ac consequat neque congue ut. Vestibulum molestie iaculis leo, id tincidunt' +
						' massa pulvinar ut. In hac habitasse platea dictumst. Cras cursus quam sit amet mollis' +
						' mollis. Maecenas vestibulum nec dolor eu tincidunt. Maecenas blandit tellus vel mauris' +
						' dictum fringilla. In quis velit elementum, feugiat massa sit amet, rutrum metus. Fusce' +
						' dolor tellus, mattis ac rhoncus non, pharetra eget lectus. Cum sociis natoque penatibus' +
						' et magnis dis parturient montes, nascetur ridiculus mus. Duis scelerisque sem quis mi' +
						' ornare, eu egestas ex consectetur. Nam et ex at dui ultrices congue quis id neque.'
					},
					{
						id: 4,
						title: 'News story 4',
						content: 'Cras fermentum ante tellus, nec pharetra nisi consequat in. Curabitur eu' +
						' accumsan risus, quis consectetur libero. Nunc et nunc finibus, vestibulum metus ut,' +
						' ultrices quam. Cras a velit in urna ullamcorper condimentum non nec nisi. Aliquam nec' +
						' ipsum euismod, ornare ex vel, mattis diam. Fusce a urna purus. Sed eu blandit metus, a' +
						' luctus libero. Nunc ante tellus, varius sed consectetur non, vehicula at nulla.' +
						' Phasellus viverra libero ligula, vitae eleifend tortor dictum sed. Aliquam interdum diam' +
						' nibh, ac fringilla lectus suscipit at.'
					},
					{
						id: 5,
						title: 'News story 5',
						content: 'Pellentesque venenatis felis a mauris iaculis auctor. Aenean sagittis felis et' +
						' vehicula interdum. Vestibulum finibus nisi id euismod elementum. Morbi ac sapien et massa' +
						' maximus faucibus ac et eros. Quisque erat metus, euismod sit amet enim eget, semper mollis' +
						' neque. Sed quis libero et ex placerat vulputate sit amet vitae ex. Nam sed nunc eros.' +
						' Suspendisse et porttitor leo.'
					},
					{
						id: 6,
						title: 'News story 6',
						content: 'Duis sed quam eleifend, vestibulum massa vitae, tincidunt dolor. Cras hendrerit' +
						' tortor id ultrices vulputate. Suspendisse vehicula nisi et leo tincidunt, vitae porttitor' +
						' nisl dignissim. Nulla facilisi. Integer vitae ante id nulla posuere egestas ac eu ex.' +
						' Phasellus facilisis ut augue a semper. Vivamus viverra iaculis enim. Morbi a elementum' +
						' nunc. Aliquam interdum massa sed congue posuere. Nullam malesuada lacus purus, at' +
						' convallis est bibendum at. Curabitur diam tortor, vulputate sed ultricies in, vehicula' +
						' vitae urna. Ut vel velit ut ante ultricies feugiat. Suspendisse convallis nisl gravida' +
						' ligula faucibus cursus. Integer at libero ultricies arcu tempor lacinia ac ut leo.'
					},
					{
						id: 7,
						title: 'News story 7',
						content: 'Sed lectus felis, venenatis malesuada ex a, tempor malesuada urna. Suspendisse' +
						' potenti. Duis at elit vel nisi consectetur volutpat. Vestibulum quis iaculis tellus, eget' +
						' luctus turpis. Ut posuere faucibus ligula ut dapibus. Donec pulvinar et mauris a' +
						' sollicitudin. Cras faucibus ante eget ante gravida viverra. Donec porta, ligula id' +
						' pulvinar dictum, magna nisl placerat augue, a ullamcorper orci magna a ex. Cras sit amet' +
						' urna erat. Nam tristique urna varius ex porttitor laoreet. Curabitur felis magna, rhoncus' +
						' eget faucibus sed, laoreet ac dui. Etiam condimentum blandit tellus, vitae vulputate arcu' +
						' feugiat et.'
					},
					{
						id: 8,
						title: 'News story 8',
						content: 'Aenean eget vehicula lectus, a vulputate elit. Aenean id ligula nec velit pharetra' +
						' viverra at in est. Phasellus suscipit elit ut sem ullamcorper, nec tempus purus interdum.' +
						' Etiam eu velit justo. Donec feugiat neque eget purus volutpat consectetur. Proin maximus' +
						' arcu nisl. Nulla rhoncus blandit feugiat. Etiam a ornare eros. Sed magna ex, commodo quis' +
						' lectus sit amet, laoreet posuere urna. Aliquam et tincidunt enim, non ornare velit. Aenean' +
						' mattis, quam ac bibendum mattis, justo nibh malesuada elit, finibus fringilla mi mauris' +
						' vel turpis. Donec sit amet auctor dui, ut dapibus elit. In non tincidunt magna, vel' +
						' fermentum enim. Aenean vulputate commodo lacus, vitae porttitor quam tristique eget.'
					},
					{
						id: 9,
						title: 'News story 9',
						content: 'Cras non tellus viverra eros pellentesque venenatis. Nam hendrerit vel massa quis' +
						' faucibus. Nulla egestas magna ex, sit amet cursus sem cursus ut. Proin consectetur augue' +
						' viverra, aliquam nulla quis, congue eros. Nullam lacinia vulputate tristique. Donec' +
						' consequat nibh sit amet urna tincidunt, ac sodales mauris pharetra. In id lorem mollis,' +
						' viverra sapien ut, congue lorem. Donec a urna id leo convallis aliquam. Curabitur varius' +
						' odio sed metus interdum lacinia. Maecenas non mauris eget quam gravida vehicula suscipit' +
						' sed quam. In interdum urna eget nisi semper semper. Sed mollis eget magna quis feugiat.' +
						' Praesent vel imperdiet nunc, in scelerisque lectus. Nam ut enim ac metus dictum posuere' +
						' a sit amet nunc.'
					}
				]

			});

		}
	]);

	return COMPONENT_NAME
});
