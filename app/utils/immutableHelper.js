import { List, Map, Set, OrderedSet, OrderedMap } from 'immutable';

export function isImmutable(thing) {
  return Boolean(
    isList(thing) ||
      isMap(thing) ||
      isSet(thing) ||
      isOrderedSet(thing) ||
      isOrderedMap(thing),
  );
}

function isList(thing) {
  return Boolean(thing instanceof Object && thing['@@__IMMUTABLE_LIST__@@']);
}

function isMap(thing) {
  return Boolean(thing instanceof Object && thing['@@__IMMUTABLE_MAP__@@']);
}

function isSet(thing) {
  return Boolean(thing instanceof Object && thing['@@__IMMUTABLE_SET__@@']);
}

function isOrderedSet(thing) {
  return Boolean(
    thing instanceof Object &&
      thing['@@__IMMUTABLE_ORDERED__@@'] &&
      Object.prototype.hasOwnProperty.call(thing, '__hash'),
  );
}

function isOrderedMap(thing) {
  return Boolean(
    thing instanceof Object &&
      thing['@@__IMMUTABLE_ORDERED__@@'] &&
      !Object.prototype.hasOwnProperty.call(thing, '__hash'),
  );
}

export function isImmutableObject(any) {
  return Boolean(
    List.isList(any) ||
      Map.isMap(any) ||
      Set.isSet(any) ||
      OrderedSet.isOrderedSet(any) ||
      OrderedMap.isOrderedMap(any),
  );
}
