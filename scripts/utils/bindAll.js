export function bindAll(object) {
  const functions = [].slice.call(arguments, 1);

  for (let i = 0; i < functions.length; i++) {
    const f = functions[i];
    object[f] = bind(object[f], object);
  }
}

function bind(func, context) {
  return function() {
    return func.apply(context, arguments);
  }
}