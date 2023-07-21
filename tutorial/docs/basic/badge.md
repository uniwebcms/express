---
sidebar_position: 1
---

# Badge

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