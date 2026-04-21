import React, { useState, useEffect } from "react";
import "./PostFacebook.css";

const PostFacebook = () => {
  const [likes, setLikes] = useState(0);
  const [shares, setShares] = useState(0);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const [responses, setResponses] = useState({});
  const [responseText, setResponseText] = useState({});

  useEffect(() => {
    console.log("Post cargado correctamente");
  }, []);

  // Agregar comentario
  const addComment = () => {
    if (text.trim() === "") return;
    setComments([...comments, text]);
    setText("");
  };

  // Agregar respuesta a comentario
  const addResponse = (index) => {
    if (!responseText[index] || responseText[index].trim() === "") return;

    const newResponses = { ...responses };

    if (!newResponses[index]) {
      newResponses[index] = [];
    }

    newResponses[index].push(responseText[index]);

    setResponses(newResponses);

    setResponseText({
      ...responseText,
      [index]: "",
    });
  };

  return (
    <div className="container">
      <div className="post">

        {/* Header */}
        <div className="header">
          <img
            src="https://i.pravatar.cc/40"
            alt="perfil"
          />
          <div>
            <h4>Juan Pérez</h4>
            <span>Hace 5 min</span>
          </div>
        </div>

        {/* Texto */}
        <p>Aprendiendo React con Hooks 🚀🔥</p>

        {/* Imagen */}
        <img
          className="post-img"
          src="https://www.paulinacocina.net/wp-content/uploads/2024/01/receta-de-postre-de-maracuya-Paulina-Cocina-Recetas-1722251880.jpg"
          alt="post"
        />

        {/* Stats */}
        <div className="stats">
          👍 {likes} · 🔁 {shares} · 💬 {comments.length}
        </div>

        {/* Botones */}
        <div className="actions">
          <button onClick={() => setLikes(likes + 1)}>👍 Like</button>
          <button onClick={() => setShares(shares + 1)}>🔁 Compartir</button>
        </div>

        {/* Input comentario */}
        <div className="comment-box">
          <input
            type="text"
            placeholder="Escribe un comentario..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={addComment}>Comentar</button>
        </div>

        {/* Comentarios */}
        <div className="comments">
          {comments.map((c, i) => (
            <div key={i} className="comment">

              <p><strong>Usuario:</strong> {c}</p>

              {/* Respuestas */}
              <div className="responses">
                {responses[i] &&
                  responses[i].map((r, j) => (
                    <p key={j} className="response">↳ {r}</p>
                  ))}
              </div>

              {/* Input respuesta */}
              <div className="response-box">
                <input
                  type="text"
                  placeholder="Responder..."
                  value={responseText[i] || ""}
                  onChange={(e) =>
                    setResponseText({
                      ...responseText,
                      [i]: e.target.value,
                    })
                  }
                />
                <button onClick={() => addResponse(i)}>Responder</button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PostFacebook;