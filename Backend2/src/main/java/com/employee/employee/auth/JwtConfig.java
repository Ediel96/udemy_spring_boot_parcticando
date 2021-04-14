package com.employee.employee.auth;

public class JwtConfig {
    public static final String LLAVE_SECRETA = "alguna.clave.sercreta.12345678";

    public  static final String RSA_PRIVADA = "-----BEGIN RSA PRIVATE KEY-----\n" +
            "MIIEowIBAAKCAQEA0VYVIB3RqUqhnzsfBoKOlmSXSFgEe5LmuOu682tabVSdtBhQ\n" +
            "/nHB6dPXBqjneft6l9Vbbop/GYKUjKkRlygEhXBSv7Q3HnjQcXcr6PFXlzjv/UHW\n" +
            "FgUsuSSMuQar6XG+MjmOj3Vw7HInxnIJk2+TKWoDkjz8LCORSMbAiqMtGuCr2LWG\n" +
            "2rTR7+RzkGLoIkM7fPRLFsazcYiSB2f7LN5AlPjVYLVt5AqkDBg75QEvnMMXL96Z\n" +
            "2dgkti0hGUQu7egv2JCGEGpKlYsnU5/PWhaPX4JjJmKBiT66ifKVi2UvWxjLN2yP\n" +
            "MCMPDXwJtxvZZkPWooxMjq9kZV+K6jtu/P/hpQIDAQABAoIBADXsiNCXHdUQJoYQ\n" +
            "ArP4maZgDyBRnAYBF3H3N1dRBiA3tdAYm3SP9TW4niFXDRm9EB1globpIkh9/Kon\n" +
            "OyLG6jM9dfNwBurQkFFKM4Nz9+46eoewl+dgOd8PbTiUYWBnLmldrj2CMS6XUWur\n" +
            "IJBcI3p9lqHrF8J+/wPSPvL3ibzsP5pNEGDbmRTYPHOb7Y4773fcMkeD3MpA6BNW\n" +
            "O50XInytWHyUowEDevK50S40LzCylrpr6hxkIv2e49jSHkoTz0Kp7WaevN5t2VKM\n" +
            "9lKvfG+3ZrFqHcR/PsY8+hrpTJYZCR48BTzye5mAnG9eNK9F2Q0CEpLXWfFz1LtM\n" +
            "/8+dbtkCgYEA9jFPR0XBHyI8RzSZNjRKDQbsrscA6QBQlB0PJ9noabUL9cJaf2uh\n" +
            "9cv6dCHILoK/MaeQ6uVFuTj358UvF0fPdpLNUX7c/5Un4YvIh7L2VDxv+tiEf7fF\n" +
            "zKih5AaEiISAvwEQD3Jg9XRl2EXH82AO0jnloYkNiKsxnNB5GGgcd58CgYEA2azo\n" +
            "tbYSFpOHN5zWBVwiCbybwvQ9dgmIBduSjk6z+RZ1NhXUxBtyHQF6IYibpALZDTd4\n" +
            "GrysY+FiNWul3LfeDHxdkx+bX3xT/a89kEOH93TmVZwSPp3t8kFWguBD7GPOvcO0\n" +
            "IALKEWjcmdUgw7NfcQA+lpEkl1M3/wlyWJLtsDsCgYBME9jH0YpoMJAoAN0Hnwjz\n" +
            "FZy2NdDWL762xnQUgIYNhGD5xOFqVrxp1GrE0Fun48dpdLqXm9n77trMyGZQ72Pw\n" +
            "5FSGRonMgS8dx7BkHq14QmToQ1hOj1+Uatf8OvdhqHCQlad83n+P2jROrOGpF5n8\n" +
            "5N9NF6kS/rQKHXIOVL3XSQKBgQCvu41f7e6qdU4L0r1iNGBydedWO/JGkilTeVHX\n" +
            "O6jGZqAYGwXbkMDOs/uSiQQGJBpxNh/rjfiq5jFwKUkNaQ+GCv1Moo7ARtJUEx7j\n" +
            "kfF6ENFHuilsjfmkw6UBIecUN/uXbiDEWxwhdAPs2YiLFgvuYaEl02W0GYYyisDa\n" +
            "yzvDMwKBgCwTUNNmIROZ6KlK32Bq8WN56XTdZ2Tfg+pgz1UbQcU+qyk/QqOiRCeB\n" +
            "PPLQFuLDX0rpeLw1cPHuP7blwZSVckFGXM7E5DuaosXu3xFAbpHoOeJTyF8nowE4\n" +
            "A79VCPeKnPxCf5NklDLtaUriGrIpPaD/hrmcdUO5qXyVvGG8LnCc\n" +
            "-----END RSA PRIVATE KEY-----\n";

    public  static final String RSA_PUBLICA = "-----BEGIN PUBLIC KEY-----\n" +
            "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0VYVIB3RqUqhnzsfBoKO\n" +
            "lmSXSFgEe5LmuOu682tabVSdtBhQ/nHB6dPXBqjneft6l9Vbbop/GYKUjKkRlygE\n" +
            "hXBSv7Q3HnjQcXcr6PFXlzjv/UHWFgUsuSSMuQar6XG+MjmOj3Vw7HInxnIJk2+T\n" +
            "KWoDkjz8LCORSMbAiqMtGuCr2LWG2rTR7+RzkGLoIkM7fPRLFsazcYiSB2f7LN5A\n" +
            "lPjVYLVt5AqkDBg75QEvnMMXL96Z2dgkti0hGUQu7egv2JCGEGpKlYsnU5/PWhaP\n" +
            "X4JjJmKBiT66ifKVi2UvWxjLN2yPMCMPDXwJtxvZZkPWooxMjq9kZV+K6jtu/P/h\n" +
            "pQIDAQAB\n" +
            "-----END PUBLIC KEY-----";
}
