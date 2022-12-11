import { assert, expect, test } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import constant from "../src/constant"
// Edit an assertion and save to see HMR in action
function readFileIfExists(value?: string) {
  if (typeof value === 'string') { try { return fs.readFileSync(path.resolve(value)).toString() } catch (e) { return value } }
  return value
}

import { TargetMdHtmCode} from "../src/utils";

import  htmlHandle from "../src/htmlLinebyLineHandle";
const mdHtmlText: string = readFileIfExists("example/html-line-by-line.md") as string;
function testTextTarget(value:string){
 let before= TargetMdHtmCode(`${value}-before`, mdHtmlText),
 after= TargetMdHtmCode(`${value}-after`, mdHtmlText)
 if(!before||!after){ return [] }
  return [before,after]
}

test('单行注释-创建与取消', () => {
  const [beforeText,afterText]=testTextTarget("test:lineByLine-1")
  const htmlInstance=new htmlHandle(constant.html)
  const splitArrayAfter =htmlInstance.splitInputText(beforeText).splitArray
  expect(afterText).eq(htmlInstance.commentHeandle(splitArrayAfter),"注释")
})

test('多行注释-创建与取消', () => {
  const [beforeText,afterText]=testTextTarget("test:multiLine")

  const htmlInstance=new htmlHandle(constant.html)
  const splitArrayAfter =htmlInstance.splitInputText(beforeText).splitArray
  expect(afterText).eq(htmlInstance.commentHeandle(splitArrayAfter),"注释")
})

test('多行嵌套注释-创建与取消-1', () => {
const [beforeText,afterText]=testTextTarget("test:nestedMultiLine-1")

  const htmlInstance=new htmlHandle(constant.html)
  const splitArrayAfter =htmlInstance.splitInputText(beforeText).splitArray
  expect(htmlInstance.commentHeandle(splitArrayAfter)).eq(afterText,"注释")
  const splitArrayBefore =htmlInstance.splitInputText(afterText).splitArray
  expect(htmlInstance.unCommentHeandle(splitArrayBefore)).eq(beforeText,"取消注释")
})

test('多行嵌套注释-创建与取消-2', () => {
  const [beforeText,afterText]=testTextTarget("test:nestedMultiLine-2")
  const htmlInstance=new htmlHandle(constant.html)
    expect(htmlInstance.handle(beforeText)).eq(afterText,"注释")
    expect(htmlInstance.handle(afterText)).eq(beforeText,"取消注释")
})

test('多行嵌套注释-创建与取消-3', () => {
  const [beforeText,afterText]=testTextTarget("test:nestedMultiLine-3")

  const htmlInstance=new htmlHandle(constant.html)
    expect(htmlInstance.handle(beforeText)).eq(afterText,"注释")
    expect(htmlInstance.handle(afterText)).eq(beforeText,"取消注释")
})