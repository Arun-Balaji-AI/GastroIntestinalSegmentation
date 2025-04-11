export default function Message({ sender, text }: { sender: 'user' | 'bot'; text: string }) {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
  className={`px-4 py-3 rounded-lg max-w-3xl ${
    isUser
      ? 'bg-blue-600 text-white self-end rounded-br-none'
      : 'bg-gray-100 text-black self-start rounded-bl-none'
  }`}
  style={{ textAlign: 'justify', whiteSpace: 'pre-wrap' }}
>
  {text}
</div>

    </div>
  );
}

  