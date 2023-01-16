interface loggerLevelType {
  level: number;
  name: string;
}
interface loggerType {
  setInstanceName(serviceName: string): void;
  error(...message: any[]): void;
  info(...message: any[]): void;
  debug(...message: any[]): void;
  trace(...message: any[]): void;
}
class Logger implements loggerType {
  private instanceName = "";
  private loggerLevel: string = process.env.NEXT_PUBLIC_LOG_LEVEL || "";

  private logLevelConst: { [key: string]: loggerLevelType } = {
    error: { level: 1, name: "ERROR" },
    info: { level: 2, name: "INFO" },
    debug: { level: 3, name: "DEBUG" },
    trace: { level: 4, name: "TRACE" },
  };

  constructor(instanceName: string) {
    this.setInstanceName(instanceName);
  }

  public setInstanceName = (instanceName: string) => {
    this.instanceName = instanceName;
  };

  private getInstanceName = (): string => {
    if (this.instanceName === "" && typeof window !== "undefined") {
      this.instanceName = window.location.pathname;

      if (this.instanceName.indexOf("/") != -1) {
        const instanceNameArr: string[] = this.instanceName.split("/");

        this.instanceName = instanceNameArr[instanceNameArr.length - 1];
      }
    }
    return this.instanceName;
  };

  private getLoggerLevel = (): loggerLevelType => {
    if (this.logLevelConst[logger.loggerLevel]) {
      return this.logLevelConst[logger.loggerLevel];
    }
    return { level: 0, name: "" };
  };

  private getLogDate = (): string => {
    const now = new Date();
    return now.toISOString();
  };

  private log = (loggerLevel: loggerLevelType, ...message: any[]): void => {
    if (this.getLoggerLevel().level >= loggerLevel.level) {
      const loggerTag = `[${this.getLogDate()}] ${loggerLevel.name} ${this.getInstanceName()} - `;
      if (loggerLevel.level === 1) {
        console.error(loggerTag, ...message);
        return;
      }
      console.log(loggerTag, ...message);
    }
  };

  error = (...message: any[]) => {
    this.log(this.logLevelConst.error, ...message);
  };

  info = (...message: any[]) => {
    this.log(this.logLevelConst.info, ...message);
  };

  debug = (...message: any[]) => {
    this.log(this.logLevelConst.debug, ...message);
  };

  trace = (...message: any[]) => {
    this.log(this.logLevelConst.trace, ...message);
  };
}

export default Logger;

const logger = new Logger("");
export { logger };
