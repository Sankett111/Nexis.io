'use client'
import { User } from "@supabase/supabase-js"
import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import { useState, useTransition, useRef, Fragment} from "react"
import { ArrowUpIcon, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { askAiAboutNoteAction } from "@/action/notes"

type Props={
    user:User | null
}

function AiButton({user}:Props) {
  const router=useRouter()

    const [isPending,startTransition]=useTransition()

    const [isOpen,setIsOpen]=useState(false)
    const [questionText,setQuestionText]=useState("")
    const [question,setQuestion]=useState<string[]>([])
    const [responses,setResponse]=useState<string[]>([])

    const handleOpenChange=(isOpen:boolean)=>{
      if(!user){
        router.push("/login")
      }
      else{
        if(isOpen){
          setQuestionText("");
          setQuestion([]);
          setResponse([]);
        }
        setIsOpen(isOpen)
      }
    }

const textAreaRef=useRef<HTMLTextAreaElement>(null)
const contentRef=useRef<HTMLDivElement>(null)

const handleInput=()=>{
  const textArea=textAreaRef.current
  if(!textArea) return
  textArea.style.height="auto"
  textArea.style.height=textArea.scrollHeight+"px"
 
}
const handleClickInput=()=>{
  textAreaRef.current?.focus()
  }
const handleSubmit=async()=>{
  if (!questionText.trim()) return
 const newQuestion=[...question,questionText]
 setQuestion(newQuestion)
 setQuestionText("")
 setTimeout(scrollToBottom,100)
const response=await askAiAboutNoteAction(newQuestion,responses)
 startTransition(()=>{
  setResponse(prev=>[...prev,response])
                
  setTimeout(scrollToBottom,100)
 })
}
const scrollToBottom=()=>{
  contentRef.current?.scrollTo({
    top:contentRef.current?.scrollHeight,
    behavior:"smooth"
  })
}
const handleKeyDown=(e:React.KeyboardEvent<HTMLTextAreaElement>)=>{
  if(e.key==="Enter"&&!e.shiftKey){
    e.preventDefault()
    handleSubmit()
  }
}
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <div className="flex items-center justify-center">
    <Sparkles
  className="rounded-full text-white w-9 h-9 p-2 background-animate [background-image:linear-gradient(to_right,theme(colors.violet.900),theme(colors.indigo.800),theme(colors.fuchsia.900))]"
/></div>
  </DialogTrigger>
  <DialogContent className="flex h-[85vh] max-w-4xl flex-col overflow-y-auto ref{contentRef}">
    <DialogHeader>
      <DialogTitle>Ask AI about Notes</DialogTitle>
      <DialogDescription>
        Our AI is ready to answer your questions about your notes.
      </DialogDescription>
    </DialogHeader>
    <div className="mt-4 flex flex-col gap-8">
      {question.map((question, index) => (
        <Fragment key={index}>
          <p className="ml-auto max-w-[60%] rounded-md bg-muted px-2 py-1 text-sm text-muted-foreground">{question}</p>
          {responses[index] && (
            <p
              className="text-muted-foreground text-sm"
              dangerouslySetInnerHTML={{ __html: responses[index] }}
            />
          )}
        </Fragment>
      ))}
      {isPending && <p className="animate-pulse text-sm">Thinking...</p>}
    </div>

    <div className="mt-auto flex cursor-text flex-col rounded-lg border p-2 gap-2"
    onClick={handleClickInput}
    >
    <Textarea
  ref={textAreaRef}
  placeholder="Ask me anything about your notes..."
  className="
    w-full resize-none bg-transparent border-none outline-none p-0 m-0 shadow-none focus:shadow-none focus:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0
  "
  style={{
    minHeight: "0",
    lineHeight: "normal",
    backgroundColor: "transparent",
  }}
  rows={1}
  onInput={handleInput}
  onKeyDown={handleKeyDown}
  value={questionText}
  onChange={(e) => setQuestionText(e.target.value)}
/>
     <Button className="ml-auto  size-8 rounded-full my-1" onClick={handleSubmit}>
      <ArrowUpIcon className="text-background" />
    </Button>
    </div>
  </DialogContent>
</Dialog>
  )
}

export default AiButton