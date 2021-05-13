# Quick Start

If you are building your app or website using the Fluro Web Builder, The Fluro API and UI Library is already included by default.


# Installation

If you are building your own app outside of the Fluro Web Builder you can install the `fluro-vue` package to your project via npm

```bash
npm install fluro-vue --save
npm install fluro-vue-ui --save

```

Include in your custom Vue app, and initialize with your `vuex` store
```javascript
// main.js

import Vue from 'vue'
import store from './store'

/////////////////////////////////////////////////////

import Fluro from 'fluro-vue';
Vue.use(Fluro, { store });


//Include Global UI components
import FluroVueUI from 'fluro-vue-ui';
Vue.use(FluroVueUI);


````


# **Basic Usage**
The `fluro` javascript API is registered on the root Vue instance, and is injected into all child components of the root and will be available on them as `this.$fluro`.

```javascript

//Example component
export default {
    data() {
        return {}
    },
    mounted(){

        //Request the current user session from the Fluro API
        this.$fluro.api.get('/session')
        .then(function(res) {
            //res.data will be the user session
        })
        .catch(function(err) {
            //Probably not logged in
        })

    }
}
```

# **Fluro Services**
`fluro-vue` includes the `fluro` and all of it's services
They are accessible from your components from the global `this.$fluro` namespace or by importing directly into your code.

| Props | Description |
| ----------- | ----------- |
| `this.$fluro.api` | A helper service for making http requests to the [Fluro REST API](https://developers.fluro.io/) it's a wrapper around the [axios](https://www.npmjs.com/package/axios) library that works in conjunction with the other Fluro modules|
| `this.$fluro.auth` | The default service for managing authentication handles automatic refreshing of access tokens, and provides login, logout and other user/application specific functionality |
| `this.$fluro.content` | A helper service for Create, Read, Update and Delete operations that wraps around the fluro.api service |
| `this.$fluro.asset` | The default service for managing, rendering and handling files and media from Fluro. It contains helper functions for managing connecting to image, audio, asset and video api endpoints. |
| `this.$fluro.date` | Provides date functions, filters and utilities for working with dates and timezones |
| `this.$fluro.access` | A helper service for understanding a user's access permissions |
| `this.$fluro.stats` | The default service for handling a user's 'stats' eg. (likes, views, favorites, downvotes etc...) This service creates and syncs user's stats when they 'stat' items from Fluro. |
| `this.$fluro.types` | A helper service for retrieving, translating and rendering content types and definitions defined within Fluro. |
| `this.$fluro.utils` | Provides helper functions for working with Fluro data |
| `this.$fluro.cache` | Provides a cache service, used for creating, clearing and storing API requests and other information in memory, rarely used directly |
| `this.$fluro.app` | Provides a service for app and website based services, including the current page the user is viewing and other app specific api functions |

For more information and up to date functionality checkout the [Fluro Javascript API Documentation](https://fluro-developers.github.io/fluro/)

## Examples

```javascript

//Retrieves the latest 6 'articles' with a status of 'active' from Fluro
//Including the title, first line, keywords, created date and slug
this.$fluro.api.get('/content/article', {
        params: {
            sort: '-created',
            status:'active',
            fields: [
                'title',
                'firstLine',
                'keywords',
                'created',
                'slug',
            ],
            limit: 6,
        }
}).then(function(res) {
    //res.data will be an array of results
});

```

```javascript

//Retrieves the results of a Fluro query 
this.$fluro.content.query('59f6b903f9b8231cb9394ccc')
.then(function(response) {
    //response is an array of results
});

```


```javascript

//Runs a dynamic query and returns the results
var criteria = {
    "_type": "event",
    "startDate": {
        "$gte": "date('-1 years')",
        "$lt": "date('now')"
    },
    "status": {
        "$in": ["active", "archived"]
    }
}

/////////////////////////////////////////////

this.$fluro.content.retrieve(criteria, {
    select: 'title firstLine startDate endDate firstLine realms definition',
    sort: '-startDate'
})
.then(function(response) {
    //response is an array of the resulting items
}, reject);

```

```javascript

    var item = {
        "_id":"59f6b903f9b8231cb9394ccc",
        "_type":"asset",
        "filename":"MyAsset.pdf",
        ...
    }

    //Returns 'https://api.fluro.io/download/59f6b903f9b8231cb9394ccc/file/MyAsset.pdf?access_token=...'
    this.$fluro.asset.downloadUrl(item);

    //Returns 'https://api.fluro.io/get/59f6b903f9b8231cb9394ccc?access_token=...'
    this.$fluro.asset.getUrl(item._id);
```







# **Filters**
`fluro-vue` registers a few helpful filters on the global scope

| Filter | Input  | Description |
| ----------- | -----------  | ----------- |
| `formatDate` | String/Date  | Returns a human-readable date using a specified format|
| `readableEventDate` | Event  | Returns a human-readable date for an event taking into consideration the context of the current time, the event's start and end time.|
| `filesize` | Integer  | Returns bytes eg '235463246' into a human readable format eg. '1.4mb' |
| `comma` | Array | Returns a comma seperated list of an array of objects |

## Examples


```html

<!-- Returns '11:30am Thursday 5th Jun 2016' -->
{{ event.startDate | formatDate('h:mma dddd Do MMM YYYY ')}}

<!-- Returns '5 - 8 March 2019' -->
{{ myEvent | readableEventDate}}

<!-- Returns '15.7mb' -->
{{ file.filesize | filesize}}

<!-- Returns 'Jeff Goldbum, Kevin Durant, Max Power' -->
{{[{title:"Jeff Goldblum"}, {title:"Kevin Durant"}, {title:"Max Power"} ] | comma('title')}}


```




# **Mixins**

## FluroSelectionMixin
Provides helpful selection/deselection functions to your component including:

| Props | Description |
| ----------- | ----------- |
| `this.selection` | An array of the currently selected items |
| `this.toggle(object)` | Selects/Deselects an object|
| `this.isSelected(object)` | Returns true if the object is currently selected|
| `this.select(object)` | A method for selecting an object|
| `this.deselect(object)` | A method for deselecting an object|
| `this.deselectAll()` | A method to clear the existing selection|
| `this.setSelection([Object, Object])` | A method for replacing the selection with a new array of objects|
| `spinner` | Whether a preloader spinner should show while the image is loading |


```javascript

import {FluroSelectionMixin} from 'fluro-vue';

////////////////////////////////////////////////////////

//My Component
export default {
    mixins:[FluroSelectionMixin],
    data:{
        something:null,
    },
    methods:{},
    
}
```






# **Services**
## **$fluro.app**
A reactive Vue service available only within apps and websites via `this.$fluro.app` built with the Fluro Web Builder. It provides helpful functions for navigating around your app, accessing native mobile APIs and playback of media content.

### Properties

| Property | Description |
| ----------- | ----------- |
| `this.$fluro.app.user` | The current logged in user for your app|
| `this.$fluro.app.site` | The entire site model of your app|
| `this.$fluro.app.themes` | All Themes (Block Styles) that have been defined in your app|
| `this.$fluro.app.menu` | A dictionary of all 'Menus' that have been defined in your app|
| `this.$fluro.app.page` | The current page the user is viewing on your app, including all relative contextual data (params, query string, items etc.)|
| `this.$fluro.app.device` | The current context and information about the device and viewport used to display the app, including screen sizes, breakpoints etc.|
| `this.$fluro.app.layers` | All currently rendered layers (modals, sidebar drawers etc)|
| `this.$fluro.app.global` | A reactive object literal that can be used to store data and communicate between blocks and components|
| `this.$fluro.app.audioPlayer` | A global Audio DOM element that can be used to play a global audio track while navigating between pages|
| `this.$fluro.app.notifications` | An array of all Push notifications recieved during the current user session|
| `this.$fluro.app.breadcrumb` | The fluro breadcrumb service for keeping track of user history and page heirarchy|
| `this.$fluro.app.native` | Provides access to native APIs and plugins if run within the context of a compiled custom mobile app|

**Examples**


```js
console.log(this.$fluro.app.themes);
/**

//Returns 
{
  "17399ea2-9d29-4000-81da-eaa1a287a000": {
    "title": "Dark",
    "key": "17399ea2-9d29-4000-81da-eaa1a287a000",
    "items": [],
    "buttonTextColor": "#fff",
    "body": {
      "fontSize": "1",
      "letterSpacing": "0"
    },
    "h1": {},
    "h2": {},
    "h3": {},
    "h4": {},
    "h5": {},
    "h6": {},
    "headingColor": "#FFFFFFFF",
    "accentColor": "#FFFFFFFF",
    "buttonColor": "#FFFFFFFF",
    "bgColor": "#222222FF",
    "color": "#FFFFFFFF",
    "css": ""
  }
}
/**/
```

```js

console.log(this.$fluro.app.menu);
/**
{
  "mainMenu": {
    "title": "Main Menu",
    "key": "mainMenu",
    "items": [
      {
        "title": "Home",
        "type": "page",
        "page": "home",
        "items": [],
        "icon": {
          "icon": "home"
        }
      },
      {
        "title": "Browse",
        "type": "page",
        "page": "browse",
        "items": [
          {
            "type": "page",
            "icon": {},
            "title": "Test",
            "items": []
          }
        ],
        "icon": {
          "icon": "list-alt"
        }
      },
      ...
    ]
  },
  "browseMenu": {
    "title": "Browse Menu",
    "key": "browseMenu",
    "items": [
      {
        "type": "page",
        "icon": {
          "icon": "calendar-alt",
          "library": "far"
        },
        "title": "Upcoming Events",
        "page": "events",
        "items": []
      }
    ]
  }
}
/**/
```

```js
console.log(this.$fluro.app.device);
/**
//Returns 
{
    "mounted": true,
    "screen":{
        "width": 310,
        "height": 590
    },
    "limits":{
        "xs": 600,
        "sm": 960,
        "md": 1264,
        "lg": 1904
    },
    "breakpoint":{
        "mobile": true,
        "tablet": false,
        "desktop": false,
        "xs": true,
        "sm": false,
        "md": false,
        "lg": false,
        "xl": false,
        "xsOnly": true,
        "smOnly": false,
        "smAndDown": true,
        "smAndUp": false,
        "mdOnly": false,
        "mdAndDown": true,
        "mdAndUp": false,
        "lgOnly": false,
        "lgAndDown": true,
        "lgAndUp": false,
        "xlOnly": false,
        "point": 0
    },
    "point": 0
}
/**/

```


```js
console.log(this.$fluro.app.breadcrumb.tree);
/**
//Returns an array of routes based on the heirarchy of the current href.

[
  {
    "title": "Home",
    "url": "/",
    "state": "home",
    ...
  },
  {
    "title": "Media",
    "url": "/media",
    "state": "media",
    ...
  },
  {
    "title": "Category",
    "url": "/media/category",
    "state": "category",
    ...
  },
]

/**/


console.log(this.$fluro.app.breadcrumb.tree);
/**
//Returns an array of routes based on the browsing history of the user, (recording each page)
[
  {
    "title": "Media",
    "name": "media",
    "query": {},
    "params": {
      "id": "5ef4505264230503fa38b4af",
      "slug": "example-series",
      "series": "5ef4505264230503fa38b4af"
    }
  },
  {
    "title": "Series",
    "name": "series",
    "query": {},
    "params": {
      "series": "5ef4505264230503fa38b4af",
      "id": "5ef4505264230503fa38b4af",
      "slug": "example-series"
    }
  }
]

/**/

```




### Methods

| Method | Description |
| ----------- | ----------- |
| `this.$fluro.app.to` | Navigate the user to another page within your app|
| `this.$fluro.app.addLayer()` | A function used to add and render an extra layer (modals, sidebar drawers) to your interface |
| `this.$fluro.app.removeLayer()` | A function used to remove layers (modals, sidebar drawers) from your interface |
| `this.$fluro.app.clearLayers()` | A function used to remove all layers from your interface |

**$fluro.app.to()**
`this.$fluro.app.to` makes it each to navigate a user to a new page. You can provide context by providing dynamic parameters and query arguments.

```js

//Equivalent of linking manually to something like '/blog/my-awesome-blog?sortRelevant=created'
this.$fluro.app.to({
    name:'blogDetail', 
    params:{ 
        slug:'my-awesome-blog',
    },
    query:{
        sortRelevant:'created',
    }
})


```




### Modals, Prompts and Dialogs

| Method | Description |
| ----------- | ----------- |
| `this.$fluro.app.confirm(title, description, options)` | Prompt the user to confirm an action|
| `this.$fluro.app.prompt(fields, title, model, description, options)` | Prompt the user with an ad-hoc form and return their input |
| `this.$fluro.app.options(options, title, description)` | Prompt the user with a list of options and return the one they select |
| `this.$fluro.app.modal(options)` | Show a custom component in a modal window |

**$fluro.app.confirm()**
`this.$fluro.app.confirm` Will show modal window to the user asking them to confirm an action. This is commonly used to ensure a user didn't accidentally click a button or make an action without fully understanding the consequences.

```js

this.$fluro.app.confirm('Confirm Delete', `Are you sure you want to delete these items?`, {
    confirmColor: 'error', //Set the color of the confirm button
    confirmText: 'Yes i want to delete!', //Set the text for the confirm button
})
.then(function(res) {
    //The user confirmed the action
})
.catch(function(err) {
    //The user cancelled/decided not to confirm
})

```


**$fluro.app.prompt()**
`this.$fluro.app.prompt` Render an ad-hoc form in a modal window and resolve the input provided by the user.

```js

this.$fluro.app.prompt([{
    title: 'Title',
    description: `eg. 'My Favorite Photos'`,
    key: 'title',
    minimum: 1,
    maximum: 1,
    type: 'string',
    params: { 
        autofocus: true //Set the focus to this field by default
    }
},
{
    title: 'Select Realms',
    description: `Which realm/s should this collection be stored in`,
    key: 'realms',
    minimum: 1,
    maximum: 0,
    type: 'reference',
    directive: 'realm-select',
    params: {
        restrictType: 'realm',
    }
},
{
    title: 'Select items',
    description: `Select items to put in this collection`,
    key: 'items',
    minimum: 0,
    maximum: 0,
    type: 'reference',
    directive: 'content-select-button',
},
{
    title: 'Archive / Expire on',
    description: `Set an archive date for this collection`,
    key: 'archiveDate',
    minimum: 0,
    maximum: 1,
    type: 'date',
    directive: 'datetimepicker',
    params: {
        // minDate:new Date(),
    }
},
], 'Create a new collection')
.then(function(response) {
    //response contains all the answers the user provided
    /**
    {
        title:'the title...',
        realms:[...],
    }
    /**/
})
.catch(function() {
    //they cancelled/closed the modal
})

```


**$fluro.app.options()**
`this.$fluro.app.options` Prompt the user with a modal showing an array of options and resolve with the option the user selects.

```js

this.$fluro.app.options([
{
    title:'Option One',
    description:'Some more information',
    value:'one',
},
{
    title:'Option Two',
    description:'Some more information',
    value:'two',
},
{
    title:'Option Three',
    description:'Some more information',
    value:'three',
    data:{some:'other data'},
},
], `Please select`, 'Please select an option below')
.then(function(answer) {
    /**
    answer is the literal object provided in the array
    {
        title:'Option Three',
        description:'Some more information',
        value:'three',
        data:{some:'other data'},
    }
    /**/
})
.catch(function(err) {
    //The user cancelled/decided not to select an option
})

```


**$fluro.app.modal()**
`this.$fluro.app.modal` Render a custom ui component in a modal window. The custom component will have two methods augmented onto it.
`close()` and `dismiss()`. Once your user has finished interaction with your component you should call the `close(result)` method with any result you want to pass back to the caller, this will resolve the promise with the argument provided
If you wish to simple cancel or dismiss the modal call the `dismiss()` function which will reject the modal promise.

```js

this.$fluro.app.modal({
    options:{
        custom:'input',
        other:{
            data:'you want to include',
        }
    },
    component:'your-custom-component-tag',
})
.then(function(result) {
    //The result if the component.close() was called
})
.catch(function(err) {
    //If the component called the dismiss() method or an error occurred
})

```



# **UI Components**

## Page Preloader
A simple preloader that can be used to display a spinner while content is loading, 
by default will appear fixed in the center of the browser window, but the contain attribute can be added if it should be contained within another
div or element


```html
<!-- Show an extra large avatar for a Fluro global user -->
<fluro-page-preloader v-if="loading"/>


<!-- Show an extra large avatar for a Fluro global user -->
<fluro-page-preloader v-if="loading" contain/>
```





## Link
A simple element used to create links to pages within your application

| Props | Type | Description |
| ----------- | ----------- | ----------- |
| `to` | Object | Link to page within your app by providing name, params, query data|
| `href` | String | A url (relative or absolute) to link to|
| `target` | String | The target window to open the link in|


**Examples** 
```html
<!-- Link to a url (simple <a> tag) -->
<fluro-link href="/watch/1234" target="_blank">Click me</fluro-link>

<!-- Link to a page with some dynamic parameters -->
<fluro-link :to="{name:'home', params:{article:'1234'}}">Click me</fluro-link>

```



## Button
A simple button that extends `<fluro-link>` and respects the visual styles and settings specified in your application.

| Props | Type | Description |
| ----------- | ----------- | ----------- |
| `to` | Object | Link to page within your app by providing name, params, query data|
| `href` | String | A url (relative or absolute) to link to|
| `target` | String | The target window to open the link in|
| `loading` | Boolean | Whether to disable the button and show a loading spinner|
| `disabled` | Boolean | Whether to disable the button or not|
| `block` | Boolean | Whether to make the button display as a block element|
| `size` | String | The size of the button `xxs`, `xs`, `sm`, `lg`, `xl`, `xxl` |
| `color` | String | Specify a color class to add to the button|
| `outline` | Boolean | Whether this button should display as an outlined style button|
| `link` | Boolean | Whether this button should display as a simple text link|
| `round` | Number | Set the corner radius for the button|
| `options` | Object | Specify all of the props in a single object|
| `tag` | String | Set the html tag that should be used to render this button eg `span`, `div`, `a`|
| `type` | String | Set the type for this button eg. `standard`, `link`, `outline`|


**Examples** 
```html
<!-- Link to a url (simple <a> tag) -->
<fluro-button href="/watch/1234" target="_blank">Click me</fluro-button>

<!-- Link to a page with some dynamic parameters -->
<fluro-button :to="{name:'home', params:{article:'1234'}}">Click me</fluro-button>

<!-- Display as a block element -->
<fluro-button block>Click me</fluro-button>

<!-- Display as a small outlined button -->
<fluro-button outline size="sm">Click me</fluro-button>

```












## Realm Tags
A component that can display coloured tags as defined in an array of realms


```html
<fluro-realm-dots :realms="[{title:'Realm One', color:'#ff0066',...}...]"/>

```




## Realm Dots
A component that can display coloured dots as defined in an array of realms


```html
<fluro-realm-dots :realms="[{title:'Realm One', color:'#ff0066',...}...]"/>

```



## Icon
A component that makes it easy to show an icon, for more information and to find out
icons that can be used checkout [The Font Awesome Icon Library](https://fontawesome.com/icons?d=gallery)

```html
<!-- Show the default icon for a 'eventtrack' in Fluro -->
<fluro-icon type="eventtrack"/>

<!-- Show an icon from the default icon set eg. Font awesome -->
<fluro-icon icon="home"/>

<!-- Show the home icon from the 'fab' (font awesome brand) library-->
<fluro-icon icon="facebook" library="fab"/>

<!-- Spin the icon endlessly -->
<fluro-icon icon="spinner" spin/>


```


## Flex Column Layout
Wraps the content inside in a Flexbox column display, allowing you to easily create fixed headers and footers
while allowing an interior element to be scrollable. Works together with the FlexColumnHeader, FlexColumnFooter and FlexColumnBody components
The Flex Column component can be nested also.

```html
<flex-column>
    <flex-column-header>
        Yay! I am fixed to the top
    </flex-column-header>



    <flex-column-body>
    <div>
        Yay! I am scrollable.
    </div>
    </flex-column-body>


    <flex-column-footer>
    <div>
        Yay! I am fixed to the bottom.
    </div>
    </flex-column-footer>


</flex-column>
```





## Avatar
A component that makes it quick and easy to show an avatar for a Fluro user, persona or contact 


```html
<!-- Show an extra large avatar for a Fluro global user -->
<fluro-avatar class="xl" :id="user._id" type="user"></fluro-avatar>

<!-- Show an extra small avatar for a Fluro contact -->
<fluro-avatar class="xs" :id="contact._id" type="contact"></fluro-avatar>

<!-- Show the avatar for a Fluro persona -->
<fluro-avatar class="xl" :id="user.persona" type="persona"></fluro-avatar>

```

## Avatar Update
A component that makes it quick and easy to show an avatar where the user can click and upload a new image

```javascript
import {FluroAvatarUpdate} from 'fluro-vue-ui';

////////////////////////////////////////////////////////

export default {
    components: {
        FluroAvatarUpdate,
    },
}
```


```html
<fluro-avatar-update :id="model._id" type="contact" />

```

| Props | Description |
| ----------- | ----------- |
| `id` | An object or object id representing the contact or persona |
| `type` | Set whether the avatar is for a 'contact' or a 'persona' *defaults to 'contact'* |







## Image
A component that makes it easy to render an image from Fluro


| Props | Description |
| ----------- | ----------- |
| `item` | An object representing a Fluro image, *can also just be a string _id of the image* |
| `width` | Set an explict width for the image *if not provided then width will be inferred from the user's screen size* |
| `height` | Set an explict height for the image *if not provided then height will be inferred from the user's screen size* |
| `spinner` | Whether a preloader spinner should show while the image is loading |


| Attributes | Description |
| ----------- | ----------- |
| `cover` | The image will cover the entire area |
| `contain` | The entire image will be contained within the box |


| Events | Description |
| ----------- | ----------- |
| `load` | Fires when the image has finished loading |
| `error` | If there was an error loading the image |

> Example Usage

```html
<!-- Renders an image with a preloading spinner -->
<fluro-image contain :item="image" :spinner="true" @load="onLoad" @error="onError"/>


```




## Video
A component that makes it easy to render a video from Fluro. Depending on
whether the video is an uploaded file, embed code or provided from an external service
like youtube or vimeo. If possible it will also render the poster image before playback


| Props | Description |
| ----------- | ----------- |
| `item` | An object representing the Fluro video, usually loaded from the API|
| `posterWidth` | If using a poster that is not a 16:9 aspect ratio specify a specific width|
| `posterHeight` | If using a poster that is not a 16:9 aspect ratio specify a specific height|
| `options` | Extra parameters that can be passed into the player |

> Example Usage

```html
<!-- Renders a video depending on the media provider -->
<fluro-video :item="video" :options="{}"/>


```


## Video Thumbnail
A component that makes it easy to render a thumbnail image of a video from Fluro

| Props | Description |
| ----------- | ----------- |
| `item` | An object representing the Fluro video, or the video ID|

> Example Usage

```html
<!-- Renders an image with a preloading spinner -->
<fluro-video-thumbnail :item="video"></fluro-video-thumbnail>
```

## WYSIWYG Editor
A component that makes it quick and easy to show render a rich text editor, complete with code beautifying, the ability to
mention other users by typing in @their.name and fits in and inherits the styles of the rest of your app

| Props | Description |
| ----------- | ----------- |
| `v-model` | Bind the html string to edit|
| `placeholder` | Add a placeholder|

> Example Usage

```html
<fluro-editor v-model="html" placeholder="Type your text in here"></fluro-editor>
```

```javascript
import {FluroEditor} from 'fluro-vue-ui';

////////////////////////////////////////////////////////

export default {
    components: {
        FluroEditor,
    },
    data() {
        return {
            html:'',
        }
    }
}
```

## Code Editor
An inline code editor, capable of inputting, rendering, beautifying your JSON, Javascript, HTML or SCSS/CSS code input

| Props | Description |
| ----------- | ----------- |
| `v-model` | Bind the string to edit|
| `lang` | Select the language/syntax format, Can be `json` `html` `js` or `css`|
| `height` | The starting height for the editor|

> Example Usage

```javascript
import {FluroCodeEditor} from 'fluro-vue-ui';

////////////////////////////////////////////////////////

export default {
    components: {
        FluroCodeEditor,
    },
    data() {
        return {
            script:'',
        }
    }
}
```


```html
<fluro-code-editor v-model="script" lang="json" :height="200"></fluro-code-editor>
```





## Fluro Audio
An element for managing an audio object

### Props
| Props | Type | Description |
| ----------- | ----------- | ----------- |
| `value/v-model` | Object | The Fluro Audio Item that you want to play |
| `volume` | Number | The starting volume for this audio object |
| `global` | Boolean | Whether or not this audio object should be using the global audio (single instance across the app. This is usually recommended) |


:volume="playerVolume" :muted="muted" :play="play" :pause="pause" :toggle="toggle" :mute="mute" :toggleMute="toggleMute" :unmute="unmute" :playing="playing"

### Scoped Properties
| Props | Type | Description |
| ----------- | ----------- | ----------- |
| `volume` | Number | The current volume of this player|
| `muted` | Boolean | Whether the player is muted or not|
| `play` | Function | A function to start the audio playing |
| `pause` | Function | A function to pause the audio |
| `toggle` | Function | A function to toggle the audio between play/pause |
| `mute` | Function | A function to mute the audio |
| `unmute` | Function | A function to unmute the audio |
| `toggleMute` | Function | A function to toggle between muted/unmuted |
| `playing` | Boolean | Whether or not the player is currently playing a track |



```javascript
import {FluroAudio} from 'fluro-vue-ui';

////////////////////////////////////////////////////////

export default {
    components: {
        FluroAudio,
    },
    data() {
        return {
            playing:false,
            progress:0,
            time:'',

            //This should be an audio object with an _id from Fluro
            currentTrack:{
                _id:'FLUROAUDIOID',
                _type:'audio',
                //...
            },,
        }
    },
    computed:{
        playIcon() {
            if (this.playing) {
                return 'pause';
            } else {
                return 'play';
            }
        },
    },
    methods:{
        toggle() {
            this.$refs.player.toggle();
        },
        timeUpdated(event) {
                this.progress = event.progress;
                console.log('PROGRESS', event.progress, event.currentTime);

                //Use the fluro.video service to get the hhmmss value from the time
                var time = this.$fluro.video.hhmmss(event.currentTime);
                if (_.startsWith(time, '00:')) {
                    time = time.slice(3);
                }
                this.time = time;
                //parseFloat(time / this.$refs.player.duration);
                // console.log('global player time', event.time / event.duration)
            },,
        volumeUpdated(event) {
            console.log('current volume changed', event.volume);
        },
        backward() {
            this.$refs.player.currentTime += 10;
        },
        forward() {
            this.$refs.player.currentTime += 30;
        },
        played() {
            this.playing = true;
        },
        paused() {
            this.playing = false;
        }
    },
}
```

```html
<h5>Now Playing {{currentTrack.title}}</h5>
<div> {{time}}</div>

<fluro-button @click="toggle()">
<fluro-icon :icon="playIcon"/>
</fluro-button>

<fluro-audio :global="true" ref="player" @pause="paused" @play="played" @time="timeUpdated" @volume="volumeUpdated" v-model="currentTrack" />


//OR with scoped properties for your player
<fluro-audio :global="true" ref="player" @pause="paused" @play="played" @time="timeUpdated" @volume="volumeUpdated" v-model="currentTrack">
    <template v-slot="props">
        <!-- create your interface for the player in here -->

        <a @click="props.play()">Play</a> <a @click="props.pause()">Pause</a>
    </template>

</fluro-audio>


```


## Table
A data table that provides pagination, sorting and rendering of a dataset

```javascript
import {FluroTable} from 'fluro-vue-ui';

////////////////////////////////////////////////////////

export default {
    components: {
        FluroTable,
    },
    methods:{
        clicked(row) {
            console.log('Row was clicked', row);
        }
    },
    data() {
        return {
            items:[
            {
                firstName:'Jeff',
                lastName:'Johnson',
                age:5,
                created:new Date(),
                registered:true,
            }],
            columns: [
                {
                    title: "First Name",
                    key: "firstName"
                },
                {
                    title: "Last Name",
                    key: "lastName"
                },

                {
                    title: "Age",
                    key: "age",
                    type:'number',
                    sortType:'number',
                },
                {
                    title: "Is Registered",
                    key: "registered",
                    type:'boolean',
                },
                {
                    title: "Date Created",
                    key: "created",
                    type: "date",
                    sortType:'date',
                },
                {
                    title: "When",
                    key: "created",
                    sortType: "date",
                    renderer: "timeago"
                },
                {
                    title: '',
                    key: '_id',
                    renderer: 'button',
                    button: {
                    icon: 'trash-alt',
                    shrink: true,
                    action(row) {
                        return new Promise(function(resolve, reject) {
                            console.log('Do something with the row')
                            resolve();
                        });
                    },
                },
                   
            },
            ]
        }
    }
}
```


```html
<fluro-table trackingKey="_id" :clicked="clicked" defaultSort="firstName" :pageSize="50" :items="items" :columns="columns" />
```



## Content List
This is essentially a renderless component that provides all the necessary functionality for retrieving a filtered list of a certain type of content
while allowing you to render it using your own html markup. It is a reactive Vue wrapper for a FluroContentListService, complete with pagination and Filtering

### Props
| Props | Type | Description |
| ----------- | ----------- | ----------- |
| `type` | String | The definition or type name of the content you want to list |
| `index` | Number | The starting page index upon creation (defaults to 0 which is the first page) |
| `perPage` | Number | The number of items to show per page |
| `criteria` | Object | Specifies the filter criteria for which items should return in the results |
| `fields` | Array | The array of fields to retrieve from the backed, if none provided the full objects will be returned |


### Scoped Properties
| Props | Type | Description |
| ----------- | ----------- | ----------- |
| `cumulative` | Boolean | Whether to append items to the current page instead of replacing|
| `page` | Array | The array of all items on the current page|
| `items` | Array | The array of all items returned from the backend |
| `nextPage` | Function | A function for navigating to the next page of results |
| `previousPage` | Function | A function for navigating to the previous page of results |
| `previousPageEnabled` | Boolean | Whether there is a page available before the current page |
| `nextPageEnabled` | Boolean | Whether there is a page available after the current page |
| `setPage` | Function | A function for navigating to a specified page |
| `pageIndex` | Number | The current page index  eg. '0' |
| `currentPage` | Number | The human readable page eg. '1' |
| `perPage` | Number | The number of items per page |
| `totalPages` | Number | The total number of pages available |


> Example Usage

```javascript
import {FluroContentList} from 'fluro-vue-ui';

////////////////////////////////////////////////////////

export default {
    components: {
        FluroContentList,
    },
    data() {
        return {
            fieldsToSelect:['title', 'startDate', 'firstLine'],
            // startDate:new Date(), //Crop results based on dates
            // endDate:new Date(),
            criteria:{
                sort:{
                    key:'startDate', //The field to sort on
                    type:'date', //How to sort
                    direction:'dsc', //Descending or Ascending
                },
                search:'My search keywords', //Add any extra search keywords
                filter: { //Complex Fluro Filter Criteria
                    operator: 'and',
                    filters: [
                    {
                        key: 'title',
                        comparator: 'contains',
                        value: 'Service',
                    }, 
                    {
                        key: 'status',
                        comparator: '==',
                        value: 'active',
                    }, 
                    ]
                }
            }
        }
    }
}
```

```html
<!-- Destructuring slot scope properties -->
<fluro-content-list type="event" :fields="fieldsToSelect" :criteria="criteria" :perPage="2">
    <template v-slot="{nextPage, previousPage, currentPage, page, totalPages, items, previousPageEnabled, nextPageEnabled}">
        <pre v-for="event in page">{{event.title}}</pre>
        <a :disabled="!previousPageEnabled" @click="previousPage()">Previous</a>
        <a :disabled="!nextPageEnabled" @click="nextPage()">Next</a>

        <div>{{currentPage}} of {{totalPages}}</div>
    </template>
</fluro-content-list>


<!-- OR -->
<fluro-content-list type="event" :fields="fieldsToSelect" :criteria="criteria" :perPage="2">
    <template v-slot="props">
        <pre v-for="event in props.page">{{event.title}}</pre>
        <a :disabled="!props.previousPageEnabled" @click="props.previousPage()">Previous</a>
        <a :disabled="!props.nextPageEnabled" @click="props.nextPage()">Next</a>

        <div>{{props.currentPage}} of {{props.totalPages}}</div>
    </template>
</fluro-content-list>

```







## Fluro Compile HTML
Compiles and renders a dynamic html string. A context object can be passed through as a prop to provide extra variables to compiled with the template.

| Props | Type | Description |
| ----------- | ----------- | ----------- |
| `template` | String | The HTML content to render |
| `context` | Object | An object that provides scope to the rendered template when compiling |

> Example Usage

```javascript

export default {
    data() {
        return {
            things:{
                foo:'Hello',
                bar:'World',
            },
            html:'<div>{{foo}} {{bar}}</div>',
        }
    }
}
```

```html
<fluro-compile-html :template="html" :context="things"/>
```





## Fluro Tabset
A multi-layered parallax component, that can be activated based on scroll or cursor position 

| Props | Type | Description |
| ----------- | ----------- | ----------- |
| `v-model` | String | The current tab index to be activated. You can use this to programmatically select tabs, and to set the default opening tab |
| `justified` | Boolean | Whether or not to set the tabs equally sized on the menu |
| `vertical` | Boolean | Whether to render the tab menu vertically (Defaults to false) |
| `persist` | Boolean | Whether to show the tab menu even if there is only one tab, (Defaults to false) |


## Fluro Tab
A multi-layered parallax component, that can be activated based on scroll or cursor position 

| Props | Type | Description |
| ----------- | ----------- | ----------- |
| `heading` | String | The text label heading for this tab |
| `tooltip` | String | Tooltip text to show on hover |
| `index` | String | A textual id for the tab allowing you programattically select the tab using the tabset v-model |
| `muted` | Boolean | Whether to fade the tab on the menu |
| `enabled` | Boolean | Whether to enable the tab or not (Defaults to true) |
| `icon` | String | An icon to display for the tab |

> Example Usage

```javascript

import FluroTab from '../ui/tabset/FluroTab.vue'
import FluroTabset from '../ui/tabset/FluroTabset.vue'


export default {
    data() {
        return {
            activeTab:'mytab',
        }
    },
    components:{
        'tab':FluroTab,
        'tabset':FluroTabset,
        'fluro-tab':FluroTab,
        'fluro-tabset':FluroTabset,
    },
}
```

```html
<fluro-tabset v-model="activeTab" :justified="true" :vertical="true">
    <fluro-tab heading="Tab One">
        Content for the First Tab
    </fluro-tab>
    <fluro-tab heading="Tab Two" index="mytab">
        Content for the First Tab
    </fluro-tab>
</fluro-tabset>

```



## Fluro Parallax
A multi-layered parallax component, that can be activated based on scroll or cursor position 

| Props | Type | Description |
| ----------- | ----------- | ----------- |
| `source` | String | 'mouse' if to activate on mouse move, (defaults to 'scroll') |
| `options` | Object | Options for configuring behaviour |
| `options.minX` | Number | A minimum percentage to constrain movement on the X axis|
| `options.minY` | Number | A minimum percentage to constrain movement on the Y axis|
| `options.maxX` | Number | A maximum percentage to constrain movement on the X axis|
| `options.maxY` | Number | A maximum percentage to constrain movement on the Y axis|
| `options.enableX` | Boolean | Whether to enable the effect on the X axis (defaults to true, in scrolling mode, false in mouse cursor mode)|
| `options.enableY` | Boolean | Whether to enable the effect on the Y axis (defaults to true)|
| `options.global` | Boolean | Whether or not to use the scrollable parent container as a global perspective point |


### Fluro Parallax Item
A layer for the Fluro Parallax component

| Props | Type | Description |
| ----------- | ----------- | ----------- |
| `depth` | Number | The Z axis value for this layer, (higher is further away) |
| `scale` | Number | A scale value for animating a 'zoom' effect aswell as motion |
| `inverseScale` | Boolean | Whether to scale the image larger as you scroll down instead of scaling smaller |



> Example Usage

```html

<!-- minY:45, and maxY:55, would result in the effect only moving layers between 45% and 55% of the usual moving distance, for a more subtle effect  -->
<fluro-parallax source="mouse" :options="{minY:45, maxY:55, minX:45, maxX:55}">
    <template v-slot:default>
        <div style="max-width:500px; margin:200px auto;">
            <h1>Here is some text content</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget tempus metus.
            </p>
            
        </div>
    </template>
    <template v-slot:items>
        <fluro-parallax-item class="background" :depth="4"/>
        <fluro-parallax-item class="midground" :depth="3" :scale="1">
            <p>
                Ut magna velit, posuere vel congue et, hendrerit vel nibh. Aliquam malesuada, dui posuere elementum tempor, mauris augue hendrerit enim, et laoreet ligula arcu ut sapien. Nunc orci lorem, gravida at tristique vel, sodales sit amet nibh. Vivamus ante augue, blandit nec justo sed, posuere finibus nunc. Mauris risus nibh, dictum eu lobortis in, semper eu libero.
            </p>
        </fluro-parallax-item>
         <fluro-parallax-item class="foreground" :depth="2"/>
    </template>
</fluro-parallax>

```










## Content Form
Renders a selection of form fields from your types, queries, components or definitions in Fluro. 
It will automatically render all of the fields, using the Fluro Content Field component.

| Props | Type | Description |
| ----------- | ----------- | ----------- |
| `v-model` | Object | The model to edit |
| `fields` | Array | The array of fields to render, (Usually the array from a definition) |
| `options` | Object | Extra configuration and options for the form fields |

> Example Usage

```javascript
import {FluroContentForm} from 'fluro-vue-ui';

////////////////////////////////////////////////////////

export default {
    components: {
        FluroContentForm,
    },
    data() {
        return {
            model:{},
        }
    }
}
```

```html
<!-- Will render all of the form fields recursively in the order and layout as specified the definition -->
<fluro-content-form v-model="model" :fields="definition.fields"></fluro-content-form>





<!-- Layout fields with your own custom markup -->
<fluro-content-form v-model="model" :fields="definition.fields">
<template v-slot:form="{formFields, fieldHash, model, update, options}">
    <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.lastName" v-model="model"></fluro-content-form-field>
</template>
</fluro-content-form>


```





## Content Form Field
Renders a form field as defined within Fluro
It will render all nested children and embedded fields recursively. This is mainly used 
within the Fluro Content Form Component

| Props | Type | Description |
| ----------- | ----------- | ----------- |
| `v-model` | Object | The model to edit |
| `field` | Object | The field description object from fluro |

> Example Usage

```javascript
import {FluroContentFormField} from 'fluro-vue-ui';

////////////////////////////////////////////////////////

export default {
    components: {
        FluroContentFormField,
    },
    data() {
        return {
            model:{},
            field:{
                minimum:1,
                maximum:3,
                type:'string',
                directive:'select',
                defaultValues:[]
                allowedValues:[],
                options:[{
                    name:'Option 1',
                    value:'one',
                }]
            }
        }
    }
}
```

```html
<fluro-content-form-field :field="field" v-model="model"></fluro-content-form-field>
```
### Form Field API
Form fields are defined using a certain structure in Fluro, this matches how they are created within definitions, but can also be used within your interface to quickly and easily
create forms programmatically. Each field should have a unique key and follows the following format


| Property | Type | Description |
| ----------- | ----------- | ----------- |
| `title` | String | The title/label for this field as displayed to the user |
| `key` | String | The property key to store the input on the data model |
| `type` | String | The type of data to store on this field. Options include: 'string', 'date', 'number', 'boolean', 'email', 'url', 'reference', 'integer', 'decimal', 'float', 'void', 'object' |
| `directive` | String | The input/widget type used for this field. Options include: 'input','textarea',  'select', 'button-select', 'wysiwyg', 'upload', 'embedded', 'reference-select', currency', 'code',  'order-select',  'search-select',  'time-select',  'color', 'signature', 'date-select', 'datetime-select', 'dob-select', value', custom'|
| `minimum` | Number | The minimum number of answers required for this field |
| `maximum` | Number | The maximum number of answers required for this field |
| `defaultValues` | Array | An array of default values, if maximum is 1 the first value will be used |
| `allowedValues` | Array | An array of values that can be entered |
| `defaultReferences` | Array | An array of default references, if maximum is 1 the first value will be used |
| `allowedReferences` | Array | An array of items that can be referenced |
| `options` | Array | An array of options that a user can select from for 'select' inputs |
| `options.name` | String | The option name that is displayed to the user|
| `options.value` | Anything | The value that is stored if the user selects this option |
| `expressions` | Object | An object that details any expressions for this field |
| `asObject` | Boolean | For Groups, whether the group is for display purposes or should store it's own object in the data model and append its child fields data to it |
| `askCount` | Number | How many inputs should be presented to the user by default, will be ignored if less than the minimum or greater than the maximum |
| `sameLine` | Boolean | If a group, whether it's child fields should be rendered on the same line |
| `fields` | Array | An array of child fields for this group (can be endlessly recursive) |

> Example

```javascript



//An example of a field
var field = {
    title:'My Field',
    key:'myFieldKey',
    minimum:1,
    maximum:3,
    type:'string',
    directive:'select',
    defaultValues:[],
    allowedValues:[],
    options:[{
        name:'Option 1',
        value:'one',
    },
    {
        name:'Option 2',
        value:'two',
    }],
    expressions:{
        //Expressions can either be a string to evaluate
        show:'data.anotherField == true',
        //Or a function
        show() {
            return 5 + 6 == 11;
        },
        hide:'data.someField != 5',
        hide() {
            return true;
        },
        //transform expression allows you to change the value
        //when it is set for example, if the user enters 5 and you want to store 7, you can intercept it as it's saving
        transform:{
            get(value) {
                var newValue = value + 2;
                return newValue;
            },
            set(value) {
                return value;
            }
        },
    },
}


//An example reference selector
var field = {
    title:'My Referenced Item',
    key:'myReference',
    minimum:0,
    maximum:3,
    type:'reference',
    params:{
        restrictType:'article', //could be 'photo', 'service', 'video' etc...
        allDefinitions:true, //If a basic type should we include all the defined types in the selectable options
    },
}

var fieldGroup = {
    title:'My Field Group',
    key:'myGroup',
    minimum:1,
    maximum:3,
    askCount:2,
    asObject:true, //Whether the key for this group should be added to the path
    sameLine:true, //Whether you want the fields inside this group to be rendered on the same line
    type:'group',
    fields:[{
        //...sub field
    },
    {
        //...sub field
    }]
}
```






## Interaction Form
Renders a Fluro interaction definition as a fully working form, complete with validation, submission, resetting and payments

| Props | Type | Description |
| ----------- | ----------- | ----------- |
| `title` | String | An optional display title for the form |
| `definition` | Object | The Form/Definition from Fluro to render |
| `linkedProcess` | String or Object | The process card to link to if applicable |
| `linkedEvent` | String or Object | The event to register tickets for if applicable |
| `debugMode` | Boolean | Whether the form should be rendered in 'debug/test' mode |
| `options` | Object | Extra configuration for the form and it's fields |

> Example Usage

```javascript
import {FluroInteractionForm} from 'fluro-vue-ui';

////////////////////////////////////////////////////////

export default {
    components: {
        FluroInteractionForm,
    },
    asyncComputed: {
        form: {
            get() {
                var self = this;
                //Retrieve a form from the API
                return self.$fluro.content.form('58dca35c21228d2d045a1cf7');
            }
        }
    }
}
```

```html
<fluro-interaction-form :definition="form">
    <template v-slot:info>
        <h1>My Awesome Form</h1>
    </template>

    <template v-slot:success="{result, reset}">
        
        <div> Form submitted successfully!</div>
        <v-btn @click="reset()">
            Back to form
        </v-btn>
    </template>

    <template v-slot:error="{result}">
        There was an error!

        <v-btn @click="reset()">
            Back to form
        </v-btn>
    </template>
</fluro-interaction-form>
```




## Post Form
Renders a Fluro post definition as a fully functional form

| Props | Type | Description |
| ----------- | ----------- | ----------- |
| `title` | String | An optional display title for the form |
| `type` | String | The definition name of the type of post you want to create. Eg. 'comment' |
| `target` | String or Object | The target parent you want to attach this post to |
| `options` | Object | Extra configuration for the form and it's fields |

> Example Usage

```javascript
import {FluroPostForm} from 'fluro-vue-ui';

////////////////////////////////////////////////////////

export default {
    components: {
        FluroPostForm,
    },
}
```

```html
<fluro-post-form title="Join the conversation" :options="{labels:{'body':''}, editor:{mentions:{managed:true}}}" :target="item" @created="commentAdded" type="comment">
    
    <template v-slot:authenticated>
        <div class="text-xs-center">
            You don't have permission to join this conversation
        </div>
    </template>

    <template v-slot:unauthenticated>
        <div class="text-xs-center">
            <h5>Join the conversation</h5>
            <v-btn color="primary" :to="{name:'user.login'}">
                Login
            </v-btn>
            <v-btn color="primary" :to="{name:'user.signup'}">
                Signup
            </v-btn>
        </div>
    </template>

</fluro-post-form>
```



## Post Thread
Renders a thread of posts for a specified parent item

| Props | Type | Description |
| ----------- | ----------- | ----------- |
| `v-model` | Array | An array of comments |
| `type` | String | The definition name of the type of post you want to create. Eg. 'comment' |
| `target` | String or Object | The target parent you want to attach this post to |
| `options` | Object | Extra configuration for the form and it's fields |

> Example Usage

```javascript
import {FluroPostThread} from 'fluro-vue-ui';

////////////////////////////////////////////////////////

export default {
    components: {
        FluroPostThread,
    },
    asyncComputed: {
        comments: {
            get() {
                var self = this;
                return self.$fluro.content.thread(self.item, 'comment');
            },
            default: [],
        },
}
```

```html
<fluro-post-thread v-model="comments">
    <template v-slot:post="{post}">
        <pre>{{post}}</pre>
    </template>
</fluro-post-thread>
```






## Stat Toggle
Makes it easy to add a stat toggle component, that can 'like', 'upvote', 'bookmark', 'favorite' a specified item.
As this is for toggling on/off a specific stat, all stats toggled by this component will be considered 'unique' stats

| Props | Type | Description |
| ----------- | ----------- | ----------- |
| `target` | String,Object | The item to check |
| `stat` | String | The name of the stat you want to toggle eg. 'like', 'heart', 'downvote' |



> Example Usage

```javascript
import {FluroStatToggle} from 'fluro-vue-ui';

////////////////////////////////////////////////////////

export default {
    components: {
        FluroStatToggle,
    },
}
```

```html
<fluro-stat-toggle :target="item" stat="subscribe">
    <template v-slot="{statting, toggle, statted, store}">
        <v-btn depressed block @click="toggle" :class="{primary:statted}">
            <div v-if="statted">
                <span>Following</span>
                <fluro-icon right library="fas" icon="rss"/>
            </div>
            <div v-if="!statted">
                <span>Follow</span>
                <fluro-icon right library="far" icon="rss"/>
            </div>
        </v-btn>
    </template>
</fluro-stat-toggle>
```



## Stat Total
Displays a total of stats of a specified type for an item


| Props | Type | Description |
| ----------- | ----------- | ----------- |
| `stat` | String | The name of the stat you want to display a total for |
| `unique` | Boolean | Whether the stat is a unique stat or a cumulative stat |






> Example Usage

```javascript
import {FluroStatToggle} from 'fluro-vue-ui';

////////////////////////////////////////////////////////

export default {
    components: {
        FluroStatToggle,
    },
}
```

```html
<fluro-stat-total :target="item" :unique="true" stat="subscribe">
    <template v-slot="{total, processing}">
        <span v-if="!processing">{{total}}</span>
        <span v-if="processing">
            <fluro-icon spin icon="spinner-third"/>
        </span>
    </template>
</fluro-stat-total>
```



## Content Render
Renders all defined fields for a specified data object

| Props | Type | Description |
| ----------- | ----------- | ----------- |
| `v-model` | Object | The model data to render |
| `fields` | Array | An array of all fields to render |

> Example Usage

```javascript
import {FluroContentRender} from 'fluro-vue-ui';

////////////////////////////////////////////////////////

export default {
    components: {
        FluroContentRender,
    },
    data() {
        return {
            item:{
                title:'My Item',
                data:{
                    myField:['one', 'two']
                }
            },
            definition:{
                title:'My Definition',
                fields:[{
                    key:'myField',
                    minimum:1,
                    maximum:3,
                    type:'string',
                    directive:'select',
                    defaultValues:[]
                    allowedValues:[],
                    options:[{
                        name:'Option 1',
                        value:'one',
                    },
                    ...
                    ]
                }]
            }
        }
    }
}
```

```html
<fluro-content-render v-model="item.data" :fields="definition.fields"/>
```




## Content Render Field
Render the data for a specified field

| Props | Type | Description |
| ----------- | ----------- | ----------- |
| `v-model` | Object | The model data to render |
| `field` | Object | A fluro field definition object |

> Example Usage

```javascript
import {FluroContentRenderField} from 'fluro-vue-ui';

////////////////////////////////////////////////////////

export default {
    components: {
        FluroContentRenderField,
    },
    data() {
        return {
            item:{
                title:'My Item',
                data:{
                    myField:['one', 'two']
                }
            },
            myField:{
                key:'myField',
                minimum:1,
                maximum:3,
                type:'string',
                directive:'select',
                defaultValues:[]
                allowedValues:[],
                options:[{
                    name:'Option 1',
                    value:'one',
                }
            }
        }
    }
}
```

```html
<fluro-content-render-field v-model="item.data.myField" :fields="myField"/>
```










## Date+Time Picker
Renders an input that allows a user to quickly select a time and date.
Allows for data entry of a full Javascript date timestamp as a string or date

| Props | Type | Description |
| ----------- | ----------- | ----------- |
| `v-model` | Object | The date to edit |
| `label` | String | The label to show above the signature |
| `format` | String | The format to display for the date when rendered in the text input |

> Example Usage

```javascript
import {FluroDateTimePicker} from 'fluro-vue-ui';

////////////////////////////////////////////////////////

export default {
    components: {
        FluroDateTimePicker,
    },
    data() {
        return {
            date:'2016-04-03T07:10:11.004Z',
        }
    }
}
```

```html
<fluro-date-time-picker format="h:mma - dddd D MMMM YYYY" timePickerFormat="ampm" :label="label" v-model="date" />
```


