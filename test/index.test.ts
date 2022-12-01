import { assert, expect, test } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
// Edit an assertion and save to see HMR in action
function readFileIfExists(value?: string) {
  if (typeof value === 'string') { try { return fs.readFileSync(path.resolve(value)).toString() } catch (e) { return value } }
  return value
}

import { TargetMdHtmCode, ReplaceOutermostTag } from "../src/utils";

import  htmlHendle from "../src/htmlHendle";
const mdHtmlText: string = readFileIfExists("example/html-line-by-line.md")
function testTextTarget(value:string){
  return [TargetMdHtmCode(`${value}-before`, mdHtmlText),TargetMdHtmCode(`${value}-after`, mdHtmlText)]
}

test('单行注释-创建与取消', () => {
  const [beforeText,afterText]=testTextTarget("test:lineByLine-1")
  const splitArrayAfter =htmlHendle.splitInputText(beforeText).splitArray
  expect(afterText).eq(htmlHendle.commentHeandle(splitArrayAfter),"注释")

  // const splitArrayBefore =htmlHendle.splitInputText(afterText).splitArray
  // expect(beforeText).eq(htmlHendle.unCommentHeandle(splitArrayBefore),"取消注释")

  // 处理异常的单行
//  const [beforeText2,afterText2]=testTextTarget("test:lineByLine-2")

//  const splitArrayAfter2 =htmlHendle.splitInputText(beforeText2).splitArray
//   expect(afterText2).eq(htmlHendle.commentHeandle(splitArrayAfter2),"异常-注释")

//   const splitArrayBefore2 =htmlHendle.splitInputText(afterText2).splitArray
//   // console.log("期望",beforeText2)
//   // console.log("结果",htmlHendle.unCommentHeandle(splitArrayBefore2))
  
//   expect(beforeText2).eq(htmlHendle.unCommentHeandle(splitArrayBefore2),"异常-取消注释")




})

test('多行注释-创建与取消', () => {
  const [beforeText,afterText]=testTextTarget("test:multiLine")
  const splitArrayAfter =htmlHendle.splitInputText(beforeText).splitArray
  // console.log(htmlHendle.commentHeandle(splitArrayAfter))
  expect(afterText).eq(htmlHendle.commentHeandle(splitArrayAfter),"注释")

  // const splitArrayBefore =htmlHendle.splitInputText(afterText).splitArray
  // expect(beforeText).eq(htmlHendle.unCommentHeandle(splitArrayBefore),"取消注释")
})

test('多行嵌套注释-创建与取消', () => {
const [beforeText,afterText]=testTextTarget("test:nestedMultiLine-1")
  const splitArrayAfter =htmlHendle.splitInputText(beforeText).splitArray
  expect(htmlHendle.commentHeandle(splitArrayAfter)).eq(afterText,"注释")
  
  const splitArrayBefore =htmlHendle.splitInputText(afterText).splitArray
  expect(htmlHendle.unCommentHeandle(splitArrayBefore)).eq(beforeText,"取消注释")
})