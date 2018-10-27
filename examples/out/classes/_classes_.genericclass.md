[typedoc-plugin-markdown](../README.md) > ["classes"](../modules/_classes_.md) > [GenericClass](../classes/_classes_.genericclass.md)

# Class: GenericClass

This is a generic class.

## Type parameters
#### T :  [BaseClass](_classes_.baseclass.md)

This a type parameter.

## Hierarchy

**GenericClass**

↳  [NonGenericClass](_classes_.nongenericclass.md)

## Index

### Constructors

* [constructor](_classes_.genericclass.md#constructor)

### Properties

* [p2](_classes_.genericclass.md#p2)
* [p3](_classes_.genericclass.md#p3)
* [p4](_classes_.genericclass.md#p4)
* [p5](_classes_.genericclass.md#p5)
* [value](_classes_.genericclass.md#value)

### Methods

* [getValue](_classes_.genericclass.md#getvalue)
* [setValue](_classes_.genericclass.md#setvalue)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new GenericClass**(p1: *`any`*, p2: *`T`*, p3: *`number`*, p4: *`number`*, p5: *`string`*): [GenericClass](_classes_.genericclass.md)

*Defined in [classes.ts:284](https://github.com/tgreyuk/typedoc-plugin-markdown/blob/master/examples/src/classes.ts#L284)*

Constructor short text.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| p1 | `any` |  Constructor param |
| p2 | `T` |  Private string property |
| p3 | `number` |  Public number property |
| p4 | `number` |  Public implicit any property |
| p5 | `string` |  Readonly property |

**Returns:** [GenericClass](_classes_.genericclass.md)

___

## Properties

<a id="p2"></a>

### `<Protected>` p2

**● p2**: *`T`*

*Defined in [classes.ts:295](https://github.com/tgreyuk/typedoc-plugin-markdown/blob/master/examples/src/classes.ts#L295)*

Private string property

___
<a id="p3"></a>

###  p3

**● p3**: *`number`*

*Defined in [classes.ts:295](https://github.com/tgreyuk/typedoc-plugin-markdown/blob/master/examples/src/classes.ts#L295)*

Public number property

___
<a id="p4"></a>

### `<Private>` p4

**● p4**: *`number`*

*Defined in [classes.ts:295](https://github.com/tgreyuk/typedoc-plugin-markdown/blob/master/examples/src/classes.ts#L295)*

Public implicit any property

___
<a id="p5"></a>

###  p5

**● p5**: *`string`*

*Defined in [classes.ts:295](https://github.com/tgreyuk/typedoc-plugin-markdown/blob/master/examples/src/classes.ts#L295)*

Readonly property

___
<a id="value"></a>

###  value

**● value**: *`T`*

*Defined in [classes.ts:284](https://github.com/tgreyuk/typedoc-plugin-markdown/blob/master/examples/src/classes.ts#L284)*

___

## Methods

<a id="getvalue"></a>

###  getValue

▸ **getValue**(): `T`

*Defined in [classes.ts:305](https://github.com/tgreyuk/typedoc-plugin-markdown/blob/master/examples/src/classes.ts#L305)*

**Returns:** `T`

___
<a id="setvalue"></a>

###  setValue

▸ **setValue**(value: *`T`*): `void`

*Defined in [classes.ts:301](https://github.com/tgreyuk/typedoc-plugin-markdown/blob/master/examples/src/classes.ts#L301)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | `T` |  [getValue](_classes_.genericclass.md#getvalue) is the counterpart. |

**Returns:** `void`

___

