import { Server } from "@hapi/hapi";
import { describe, it, beforeEach, afterEach } from "mocha";
import chai, { expect } from "chai";

import { init } from "../src/server";

describe("server test", async () => {
  let server: Server;
  /* beforeEach 함수는 매번 테스트를 하기 전에 깨끗한 서버 객체를 생성하고, afterEach 함수는 청소하는 함수.
  두 함수를 통해서 매번wo 시작하는 비용 없이 서버를 초기화할 수 있다.  */
  beforeEach((done) => {
    init().then((s) => {
      server = s;
      done();
    });
  });

  afterEach((done) => {
    server.stop().then(() => done());
  });

  it("index responds", async () => {
    /* 테스트는 hapi의 인젝트 메소드를 사용하여 HTTP 호출을 수행하는 데, 실제로 코드를 작성할 필요없이 서버 코드를 호출합니다. */
    const res = await server.inject({
      method: "get",
      url: "/",
    });
    expect(res.statusCode).to.equal(200);
    expect(res.result).to.equal("Hello! Hapi Server Welcomes you.");
  });
});
