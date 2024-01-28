import type { AppProps } from 'next/app';
import { logger } from '@/utils/logger';
import { Box, Flex, Textarea, Button, VStack } from '@chakra-ui/react';
import { useRef, useState } from 'react';

export default function Sqlconverter({ Component, pageProps, router }: AppProps): JSX.Element {

    const layoutHeight = 400;
    const oracleSqlRef = useRef<HTMLTextAreaElement>(null);
    const mariaSqlRef = useRef<HTMLTextAreaElement>(null);
    const [mariaSqlValue, setMariSqlValue] = useState<string | undefined>('');

    const convertToSql = (): void => {

        const oracleSql = oracleSqlRef.current?.value;
        const oracleSqlConvert = oracleSql?.
            replace(/to_date\((\s*(?:substr\(.+\)|(?:.+),)).+\)\s*\+\s*(\d)+/ig, 'DATE_ADD( $1 INTERVAL $2 DAY)')
            .replace(/to_char\((.+)\)/ig, 'CAST(\'$1\' AS VARCHAR())')
            ;

        setMariSqlValue(oracleSqlConvert);
        logger.debug('test')
    };

    logger.debug('render Sqlconverter ')
    return (
        <>
            <Flex color='white'>
                <Box flex='1' p={'5'}>
                    <Textarea textColor={'black'} h={layoutHeight} resize={"vertical"} placeholder='Oracle SQL' ref={oracleSqlRef} />
                </Box>
                <Box flex='0.1' p={'5 0 5 0'}>
                    <VStack h={layoutHeight} justifyContent={'center'}>
                        <Button colorScheme='blue' variant='outline'
                            onClick={convertToSql}
                        >Convert</Button>
                    </VStack>
                </Box>
                <Box flex='1' p={'5'}>
                    <Textarea value={mariaSqlValue} textColor={'black'} readOnly h={layoutHeight} resize={"vertical"} placeholder='Maria DB SQL' ref={mariaSqlRef} />
                </Box>
            </Flex>
        </>
    )
}