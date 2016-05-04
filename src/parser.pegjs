start = expression

expression = spaces expr:(atom / list) spaces { return expr; }

atom = number / reference
list = "(" list:expression* ")" { return list; }

number = number:[0-9]+ { return parseInt(number.join(''), 10); }
reference = reference:[^() \t\n0-9]+ { return reference.join(''); }
spaces = (space / tab / newline)* { return ' '; }

space = " "
tab = "\t"
newline = "\n"
