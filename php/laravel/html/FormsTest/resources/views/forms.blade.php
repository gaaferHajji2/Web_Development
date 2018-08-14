{{ Form::open(['url'=>'/', 'method' => 'GET']) }}

{{ Form::close() }}

{{ Form::open(['route' => 'home']) }}

{{ Form::close() }}

<!-- set the action to the Form. -->
{{ Form::open(['action'=>'UsersController@store']) }}

{{ Form::close() }}

<!-- Here we pass the parameters to the method in array. -->
{{ Form::open(['route' => ['users.show', 1]]) }}

{{ Form::close() }}

<!-- The same above to pass parameter, but without resource. -->
{{ Form::open(['action' => ['UsersController@show', 1]]) }}

{{ Form::close() }}

<!-- This form will accept file uploads -->
{{ Form::open(['route' => 'home', 'files' => true]) }}

{{ Form::close() }}
