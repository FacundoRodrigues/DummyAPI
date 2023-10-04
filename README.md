# DummyAPI

SET UP:

Configurar puertos

Backend -> Dejé habilitado el CORS para acepte el puerto 3000 de React en la clase Program.cs.

Front -> En el archivo components/Urls.js, están las urls en una constante donde también habría que configurar el puerto (está parametrizado) en el que corre el backend.

---------------------

Facts:

- Me compliqué un montón intentando usar in-memory database de EF (con este approach perdía los valores agregados a la lista de vagones entre request, finalmente descubrí que no permite persistir Listas en memoria por lo que cambié el enfoque a algo más sencillo)
- Quería usar mvc pero después de perder como 2hs con lo anterior decidí ir por un MVP (ya que hace años no uso mvc)
- En fin, no tiene nada de look and feel porque ya no tengo más tiempo para dedicarle y además quiero entregarlo lo antes posible, pero está funcional. Creo que es mi mejor esfuerzo dado el contexto.


  Btw, anoche me quedé hasta las 12 de la noche xd

