import { useEffect, useState } from "react";
import axios from "axios";

const DataFetcher = () => {
  // окремі стани
  const [data, setData] = useState(null);        // дані з сервера
  const [loading, setLoading] = useState(false); // стан завантаження
  const [error, setError] = useState(null);      // помилка, якщо буде

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );

        setData(response.data);
      } catch (err) {
        setError("Сталася помилка під час завантаження даних");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // порожній масив залежностей → запит тільки при першому завантаженні компонента

  // УМОВНИЙ РЕНДЕРИНГ СТАНІВ

  if (loading) {
    return <p>Завантаження даних...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!data) {
    // якщо ще немає даних, але й не завантажується
    return null;
  }

  // якщо все ок і дані є
  return (
    <div>
      <h2>Список користувачів</h2>
      <ul>
        {data.map(({ id, name, email }) => (
          <li key={id}>
            <strong>{name}</strong> — {email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetcher;