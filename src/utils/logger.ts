enum loggerEnum {
  "none" = 0,
  "error" = 1,
  "info" = 2,
  "debug" = 3,
  "trace" = 4
}

interface loggerLevelvalueType {
  level: number;
  name: string;
}

interface loggerType {
  setInstanceName: (serviceName: string) => void;
  error: (...message: any[]) => void;
  info: (...message: any[]) => void;
  debug: (...message: any[]) => void;
  trace: (...message: any[]) => void;
}
class Logger implements loggerType {

  private instanceName = "";
  private instanceNameInitFlag = false;
  private readonly loggerLevel = process.env.NEXT_PUBLIC_LOG_LEVEL ?? "";

  private readonly logLevelConst: Record<string, loggerLevelvalueType> = {
    none: { level: loggerEnum.none, name: "NONE" },
    error: { level: loggerEnum.error, name: "ERROR" },
    info: { level: loggerEnum.info, name: "INFO" },
    debug: { level: loggerEnum.debug, name: "DEBUG" },
    trace: { level: loggerEnum.trace, name: "TRACE" },
  };

  constructor(instanceName = "") {
    this.setInstanceNameInitFlag(instanceName.length > 0);
    this.setInstanceName(instanceName);
  }

  private setInstanceNameInitFlag(instanceNameInitFlag: boolean): void {
    this.instanceNameInitFlag = instanceNameInitFlag
  }

  /**
   * 로그 출력할 instance명을 지정한다.
   * @param instanceName 로그 instance명
   */
  public setInstanceName = (instanceName: string): void => {
    if (instanceName !== "/")
      this.instanceName = instanceName;
  };

  private readonly getInstanceName = (): string => {

    if (!this.instanceNameInitFlag) {
      this.setInstanceName("");
    }

    if (this.instanceName === "" && typeof window !== "undefined") {
      this.setInstanceName(window.location.pathname);

      if (this.instanceName.includes("/")) {
        const instanceNameArr: string[] = this.instanceName.split("/");

        for (let instanceIdx = instanceNameArr.length - 1; instanceIdx > 0; instanceIdx--) {
          if (instanceNameArr[instanceIdx].length > 0) {
            this.setInstanceName(instanceNameArr[instanceIdx]);
            break;
          }
        }
      }
    }
    return this.instanceName;
  };

  private readonly getLoggerLevel = (): loggerLevelvalueType => {

    if (this.loggerLevel in this.logLevelConst) {
      return this.logLevelConst[this.loggerLevel];
    }

    return this.logLevelConst.none;
  };

  private readonly getLogDate = (): string => {
    const now = new Date();
    return now.toISOString();
  };

  private readonly log = (loggerLevel: loggerLevelvalueType, ...message: any[]): void => {

    if (this.getLoggerLevel().level >= loggerLevel.level) {

      const loggerTag = `[${this.getLogDate()}] ${loggerLevel.name} ${this.getInstanceName()} - `;

      if (loggerLevel.level < loggerEnum.error || loggerLevel.level > loggerEnum.trace) return;

      if (loggerLevel.level === loggerEnum.error) {
        (() => { console.error(loggerTag, ...message) })();
        return;
      }

      (() => { console.log(loggerTag, ...message) })();
    }
  };

  /**
   * error 레벨의 로그
   * @param message 로그메시지
   */
  error = (...message: any[]): void => {
    this.log(this.logLevelConst.error, ...message);
  };

  /**
   * info 레벨의 로그
   * @param message 로그메시지
   */
  info = (...message: any[]): void => {
    this.log(this.logLevelConst.info, ...message);
  };

  /**
   * debug 레벨의 로그
   * @param message 로그메시지
   */
  debug = (...message: any[]): void => {
    this.log(this.logLevelConst.debug, ...message);
  };

  /**
   * trace 레벨의 로그
   * @param message 로그메시지
   */
  trace = (...message: any[]): void => {
    this.log(this.logLevelConst.trace, ...message);
  };
}

export default Logger;

const logger = new Logger("");
export { logger };
