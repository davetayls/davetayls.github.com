// Here is a Custom Matcher. A custom matcher is a custom assertion,
// tailored to your application; these help to make your tests more readable.
Screw.Matchers["be_even"] = {
match: function(expected, actual) {
  return actual % 2 == 0;
},
failure_message: function(expected, actual, not) {
  return 'expected ' + $.print(actual) + (not ? ' not' : '') + ' to be even';
}
}
