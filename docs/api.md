## Modules

<dl>
<dt><a href="#module_Badge">Badge</a></dt>
<dd><p>Create a Badge component.</p>
</dd>
<dt><a href="#module_Container">Container</a></dt>
<dd><p>Elements Container.</p>
</dd>
<dt><a href="#module_Filter">Filter</a></dt>
<dd><p>Filter profile lists.</p>
</dd>
<dt><a href="#module_LanguageToggle">LanguageToggle</a></dt>
<dd><p>Webpage language toggle widget</p>
</dd>
<dt><a href="#module_Map">Map</a></dt>
<dd><p>Google Map with markers.</p>
</dd>
<dt><a href="#module_PopoverMenu">PopoverMenu</a></dt>
<dd><p>PopoverMenu for user selections.</p>
</dd>
<dt><a href="#module_RecentItems">RecentItems</a></dt>
<dd><p>Renders the first x items in the target profile, sorted by last edit time.</p>
</dd>
<dt><a href="#module_SearchBox">SearchBox</a></dt>
<dd><p>Enable website search.</p>
</dd>
<dt><a href="#module_SiteSearch">SiteSearch</a></dt>
<dd><p>Enable website search across all pages.</p>
</dd>
<dt><a href="#module_Sorter">Sorter</a></dt>
<dd><p>Sort the profile lists.</p>
</dd>
<dt><a href="#module_blocks/AssetList">blocks/AssetList</a></dt>
<dd><p>Render a page block that contains profile assets as cards and control widgets</p>
</dd>
<dt><a href="#module_blocks/ProfileList">blocks/ProfileList</a></dt>
<dd><p>Render a page with a media header and filterable profile cards.</p>
</dd>
<dt><a href="#module_blocks/SmartFooter/PlainFooter">blocks/SmartFooter/PlainFooter</a></dt>
<dd><p>Render a footer with copyright and nav links.</p>
</dd>
<dt><a href="#module_blocks/SmartFooter/SocialConnectorFooter">blocks/SmartFooter/SocialConnectorFooter</a></dt>
<dd><p>Render a footer with newsletter and media links.</p>
</dd>
<dt><a href="#module_blocks/SmartFooter/SpeedDialFooter">blocks/SmartFooter/SpeedDialFooter</a></dt>
<dd><p>Render a footer that can preview the content of other pages.</p>
</dd>
</dl>

<a name="module_Badge"></a>

## Badge
Create a Badge component.

<a name="exp_module_Badge--module.exports"></a>

### module.exports() ⇒ <code>function</code> ⏏
Show a simple badge with a label.

**Kind**: Exported function  
**Returns**: <code>function</code> - A react component.  
**Component**: Badge  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| color | <code>string</code> | The primary color of the badge. |
| className | <code>string</code> | Additional tailwind class names. |
| children | <code>ReactNode</code> \| <code>ReactNodeArray</code> | The contents for the Badge container. |

**Example**  
```js
function MyComponent() {
  return (
      <Badge color="green" className="hover:text-red-200">
			{label}
		 </Badge>
  );
}
```
<a name="module_Container"></a>

## Container
Elements Container.

<a name="exp_module_Container--module.exports"></a>

### module.exports() ⇒ <code>function</code> ⏏
Define a wrapper that centers child elements with responsive max-width

**Kind**: Exported function  
**Returns**: <code>function</code> - A react component.  
**Component**: Container  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| className | <code>string</code> | Additional tailwind class names. |
| children | <code>ReactNode</code> \| <code>ReactNodeArray</code> | The contents for the Badge container. |

**Example**  
```js
function MyComponent() {
  return (
      <Container className="mt-20">
			{children}
		 </Container>
  );
}
```
<a name="module_Filter"></a>

## Filter
Filter profile lists.


* [Filter](#module_Filter)
    * [module.exports()](#exp_module_Filter--module.exports) ⇒ <code>function</code> ⏏
        * _static_
            * [.Search](#module_Filter--module.exports.Search) ⇒ <code>function</code>
        * _inner_
            * [~Menu()](#module_Filter--module.exports..Menu) ⇒ <code>function</code>

<a name="exp_module_Filter--module.exports"></a>

### module.exports() ⇒ <code>function</code> ⏏
A wrapper component for filter Search and Menu

**Kind**: Exported function  
**Returns**: <code>function</code> - A wrapper component.  
**Component**: Filter  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| filter | <code>object</code> | The filter state which return by useLinkedProfileFilterState |
| setFilter | <code>function</code> | The set method to update state, return by useLinkedProfileFilterState |

**Example**  
```js
function MyComponent() {
  return (
      <Filter filter={filter} setFilter={setFilter}>
         <Filter.Search/>
         <Filter.Menu/>
      </Filter>
  );
}
```
<a name="module_Filter--module.exports.Search"></a>

#### module.exports.Search ⇒ <code>function</code>
A Search widget to perform searching profiles by title

**Kind**: static constant of [<code>module.exports</code>](#exp_module_Filter--module.exports)  
**Returns**: <code>function</code> - A search component.  
**Component**: Filter.Search  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| filter | <code>Object</code> | The filter state |
| setFilter | <code>function</code> | The set method to update state |

**Example**  
```js
function MyComponent() {
  return (
      <Filter.Search filter={filter} setFilter={setFilter} />
  );
}
```
<a name="module_Filter--module.exports..Menu"></a>

#### module.exports~Menu() ⇒ <code>function</code>
A filter widget to perform filter profiles using a drop down menu

**Kind**: inner method of [<code>module.exports</code>](#exp_module_Filter--module.exports)  
**Returns**: <code>function</code> - A filter component.  
**Component**: Filter.Menu  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| filter | <code>Object</code> | The filter state |
| setFilter | <code>function</code> | The set method to update state |

**Example**  
```js
function MyComponent() {
  return (
      <Filter.Menu filter={filter} setFilter={setFilter} />
  );
}
```
<a name="module_LanguageToggle"></a>

## LanguageToggle
Webpage language toggle widget

<a name="exp_module_LanguageToggle--module.exports"></a>

### module.exports() ⇒ <code>function</code> ⏏
Create a language toggle widget for the active website

**Kind**: Exported function  
**Returns**: <code>function</code> - A language toggle component.  
**Component**: LanguageToggle  
**Example**  
```js
function MyComponent() {
   return (
      <LanguageToggle />
   );
}
```
<a name="module_Map"></a>

## Map
Google Map with markers.

<a name="exp_module_Map--module.exports"></a>

### module.exports() ⇒ <code>function</code> ⏏
Create a Map.

**Kind**: Exported function  
**Returns**: <code>function</code> - A Map component.  
**Component**: Map  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| APIKey | <code>string</code> | - |
| center | <code>object</code> | The position of the map center |
| zoom | <code>number</code> | The initial zoom level |
| markerPositions | <code>Array.&lt;object&gt;</code> | The markers' position |
| height | <code>string</code> | The height of the map element |
| [width] | <code>string</code> | The width of the map element |

**Example**  
```js
function MyComponent() {
   return (
      <Map
         APIKey="xxx"
         center={{lat:40, lng:50}}
         zoom={4}
         markerPositions={[{lat:10,lng:20}]}
         width='800px'
         height='600px' />
   );
}
```
<a name="module_PopoverMenu"></a>

## PopoverMenu
PopoverMenu for user selections.


* [PopoverMenu](#module_PopoverMenu)
    * [module.exports(trigger, triggerClassName, triggerStyle, options, menuClassName, width, zIndex, position)](#exp_module_PopoverMenu--module.exports) ⇒ <code>function</code> ⏏
        * [.usePopper()](#module_PopoverMenu--module.exports.usePopper)

<a name="exp_module_PopoverMenu--module.exports"></a>

### module.exports(trigger, triggerClassName, triggerStyle, options, menuClassName, width, zIndex, position) ⇒ <code>function</code> ⏏
Render a menu with options to be selected by the user.

**Kind**: Exported function  
**Returns**: <code>function</code> - A React component.  
**Component**: PopoverMenu  

| Param | Type | Description |
| --- | --- | --- |
| trigger | <code>ReactElement</code> | The Trigger element |
| triggerClassName | <code>string</code> | The class name that apply to the trigger element |
| triggerStyle | <code>CSSStyleRule</code> | The style that apply to the trigger element |
| options | <code>Array.&lt;ReactElement&gt;</code> | The option elements in the dropdown menu |
| menuClassName | <code>string</code> | The class name that apply to the menu element |
| width | <code>string</code> | The menu width |
| zIndex | <code>number</code> | The zIndex value of the menu |
| position | <code>string</code> | The position of the menu relative to the trigger |

**Example**  
```js
function MyComponent() {
  const options = [<div>Option 1</div>, <div>Option 2</div>, <div>Option 2</div>];

   return (
      <PopoverMenu
         trigger={<div>Open Menu</div>}
         options={options}
         triggerClassName='px-2 py-1 text-blue-600 text-sm border rounded'
         position='top-0 left-4'
         width='120px'
         zIndex='10' />
   );
}
```
<a name="module_PopoverMenu--module.exports.usePopper"></a>

#### module.exports.usePopper()
Example implementation to use Popper: https://popper.js.org/

**Kind**: static method of [<code>module.exports</code>](#exp_module_PopoverMenu--module.exports)  
<a name="module_RecentItems"></a>

## RecentItems
Renders the first x items in the target profile, sorted by last edit time.

<a name="exp_module_RecentItems--module.exports"></a>

### module.exports(profile, properties) ⇒ <code>JSX.Element</code> ⏏
**Kind**: Exported function  
**Returns**: <code>JSX.Element</code> - - Rendered component.  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| profile | <code>Profile</code> | Target profile containing items. |
| properties | <code>Object</code> | Additional properties. |
| properties.profileType | <code>string</code> | Profile type to look for in the target profile. |
| properties.section | <code>string</code> | Section of the profile to retrieve items from. |
| [properties.maxCount] | <code>number</code> | Maximum number of items to render, default as 3. |
| [properties.linkTo] | <code>string</code> | URL prefix for each item when rendering it as a link. |

**Example**  
```js
function MyComponent() {
   return (
      <RecentItems
          profile={profile}
          properties={{
              profileType: 'articles',
              section: 'member_articles',
              maxCount: 4,
              linkTo: 'articles'
          }}
      />;
   );
}
```
<a name="module_SearchBox"></a>

## SearchBox
Enable website search.

<a name="exp_module_SearchBox--module.exports"></a>

### module.exports() ⇒ <code>function</code> ⏏
A search box

**Kind**: Exported function  
**Returns**: <code>function</code> - A search component.  
**Component**: SearchBox  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| placeholder | <code>string</code> | The placeholder value |
| searchText | <code>string</code> | The current search value |
| handleSearch | <code>function</code> | The method handle on search value change |
| live | <code>bool</code> | A flag indicate if the handleSearch will be trigger every changes or only when enter click |

**Example**  
```js
function MyComponent() {
  return (
      <SearchBox
			placeholder={"search"}
			filters={{searchText:'xxx'}}
			handleSearch={(newValue)=>{}}
			live={true}
		 />
  );
}
```
<a name="module_SiteSearch"></a>

## SiteSearch
Enable website search across all pages.

<a name="exp_module_SiteSearch--module.exports"></a>

### module.exports() ⇒ <code>function</code> ⏏
Create a SiteSearch widget.

**Kind**: Exported function  
**Returns**: <code>function</code> - A Search component.  
**Component**: SiteSearch  
**Example**  
```js
function MyComponent() {
   return (
      <SiteSearch />
   );
}
```
<a name="module_Sorter"></a>

## Sorter
Sort the profile lists.

<a name="exp_module_Sorter--module.exports"></a>

### module.exports() ⇒ <code>function</code> ⏏
A sorting widget to sort profiles.

**Kind**: Exported function  
**Returns**: <code>function</code> - A Sorting component.  
**Component**: Sorter  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| filter | <code>object</code> | The filter state which return by useLinkedProfileFilterState |
| setFilter | <code>function</code> | The set method to update state, return by useLinkedProfileFilterState |
| menuCategories | <code>obj</code> | A map that defines what sorting category will be displayed in the menu |

**Example**  
```js
function MyComponent() {
  return (
      <Sorter filter={filter} setFilter={setFilter} />
  );
}
```
<a name="module_blocks/AssetList"></a>

## blocks/AssetList
Render a page block that contains profile assets as cards and control widgets

<a name="exp_module_blocks/AssetList--module.exports"></a>

### module.exports() ⇒ <code>function</code> ⏏
Render a wrapper for the cards and controls

**Kind**: Exported function  
**Returns**: <code>function</code> - A react component.  
**Component**: AssetList  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| profile | <code>Profile</code> | A data profile. |
| section | <code>string</code> | The name of the section which contains the assets. |
| children | <code>ReactNode</code> | The child components to render. You can choose from [AssetList.Sort, AssetList.Search], or provide a custom React element. |
| className | <code>string</code> | The className for the wrapper component. |
| listWrapperClassName | <code>string</code> | The className for the wrapper component of the list of cards. |
| controlWrapperClassName | <code>string</code> | The className for the wrapper component of the controls. |
| options | <code>object</code> | Options for the list of cards, including the field name in the section representing the asset file, asset title, and asset description to be displayed. |

<a name="module_blocks/ProfileList"></a>

## blocks/ProfileList
Render a page with a media header and filterable profile cards.

<a name="exp_module_blocks/ProfileList--module.exports"></a>

### module.exports() ⇒ <code>function</code> ⏏
Render a page with a media header and filterable profile cards.

**Kind**: Exported function  
**Returns**: <code>function</code> - A react component.  
**Component**: ProfileList  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| profile | <code>Profile</code> | A data profile. |
| block | <code>Block</code> | The template properties for the component. |
| page | <code>Page</code> | The page that contains the block. |
| website | <code>Website</code> | The website that contains the page. |

<a name="module_blocks/SmartFooter/PlainFooter"></a>

## blocks/SmartFooter/PlainFooter
Render a footer with copyright and nav links.

<a name="exp_module_blocks/SmartFooter/PlainFooter--module.exports"></a>

### module.exports() ⇒ <code>function</code> ⏏
Render a plain footer with copyright and nav links

**Kind**: Exported function  
**Returns**: <code>function</code> - A react component.  
**Component**: Plain  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| profile | <code>Profile</code> | A data profile. |
| block | <code>Block</code> | The template properties for the component. |
| page | <code>Page</code> | The page that contains the block. |
| website | <code>Website</code> | The website that contains the page. |
| extra | <code>Object</code> | Extra props from parent such as 'as' |

<a name="module_blocks/SmartFooter/SocialConnectorFooter"></a>

## blocks/SmartFooter/SocialConnectorFooter
Render a footer with newsletter and media links.

<a name="exp_module_blocks/SmartFooter/SocialConnectorFooter--module.exports"></a>

### module.exports() ⇒ <code>function</code> ⏏
Render a footer with newsletter and media links

**Kind**: Exported function  
**Returns**: <code>function</code> - A react component.  
**Component**: SocialConnector  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| profile | <code>Profile</code> | A data profile. |
| block | <code>Block</code> | The template properties for the component. |
| page | <code>Page</code> | The page that contains the block. |
| website | <code>Website</code> | The website that contains the page. |
| extra | <code>Object</code> | Extra props from parent such as 'as' |

<a name="module_blocks/SmartFooter/SpeedDialFooter"></a>

## blocks/SmartFooter/SpeedDialFooter
Render a footer that can preview the content of other pages.

<a name="exp_module_blocks/SmartFooter/SpeedDialFooter--module.exports"></a>

### module.exports() ⇒ <code>function</code> ⏏
Render a footer that can preview the content of other pages.

**Kind**: Exported function  
**Returns**: <code>function</code> - A react component.  
**Component**: SpeedDial  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| profile | <code>Profile</code> | A data profile. |
| block | <code>Block</code> | The template properties for the component. |
| page | <code>Page</code> | The page that contains the block. |
| website | <code>Website</code> | The website that contains the page. |
| extra | <code>Object</code> | Extra props from parent such as 'as' |

