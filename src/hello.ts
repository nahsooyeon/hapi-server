import {
  Request,
  ResponseToolkit, // 모든 생명주기 메서드로 전달되는 속성과 유틸리티의 집합.
  ResponseObject, // ResponseToolkit 이  생성하는 응답객체.
  ServerRoute, // 서버에 정의된 라우트. 배열에 담을 수 있고, method/path/핸들링 함수를 포함한다.
} from "@hapi/hapi";

const sayHello = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  const name: string = request.params.name || "World";
  const response = h.response("Hello " + name);
  response.header("X-Custom", "some-value");
  return response;
};

export const helloRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/hello",
    handler: sayHello,
  },
  {
    method: "GET",
    path: "/hello/{name}",
    handler: sayHello,
  },
];
