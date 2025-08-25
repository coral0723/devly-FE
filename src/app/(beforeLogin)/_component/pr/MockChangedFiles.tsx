import { colorizeCode } from "@/app/(afterLogin)/pr/[studyId]/[prId]/_lib/colorizeCode"

export default function MockChangedFiles() {
  const content = "import { useState } from \"react\";\nimport axios from \"axios\";\n\nexport function useLogin() {\n  const [loading, setLoading] = useState(false);\n\n  async function login(username: string, password: string) {\n    setLoading(true);\n    try {\n      const res = await axios.post(\"/api/login\", { username, password });\n      if (res.status !== 200) {\n        alert(\"Login failed\");\n      }\n    } catch (e) {\n      console.error(e);\n    } finally {\n      setLoading(false);\n    }\n  }\n\n  return { login, loading };\n}";
  return (
    <div className="flex-1 overflow-hidden px-4 mt">
      {/* Code Area */}
      <div className="space-y-4 max-h-[calc(100vh-12rem)] overflow-y-auto pb-8">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
            <span className="font-medium text-gray-800">src/hooks/useLogin.ts</span>
            <span className="text-xs text-gray-500">JavaScript</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
            <tbody>
              {content.split('\n').map((line, i) => (
                <tr key={i}>
                  <td className="select-none w-12 pl-4 pr-2 text-right text-gray-400 border-r border-gray-100 text-xs md:text-sm">
                    {i + 1}
                  </td>
                  <td className="px-2 font-mono whitespace-pre text-xs md:text-sm">
                    {colorizeCode(line, "Javascript")}
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}