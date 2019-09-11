
function add (num) {
  num = Number(num)
  num = isNaN(num) ? 0 : num
  return this + num
}
function de (num) {
  num = Number(num)
  num = isNaN(num) ? 0 : num
  return this - num
}
Number.prototype.add = add
Number.prototype.de = de
(5).add(3).de(2)
